import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../database/database.service';
import { LoginDto, RegisterDto } from '@BRIXA/api';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { SecurityService } from '../common/services/security.service';
import { UserCacheService } from '../common/services/user-cache.service';

interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'lax' | 'strict' | 'none';
  path: string;
  maxAge?: number;
}

@Injectable()
export class AuthService {
  constructor(
    private db: DatabaseService,
    private jwt: JwtService,
    private configService: ConfigService,
    private securityService: SecurityService,
    private userCache: UserCacheService,
  ) {}

  /**
   * Get cookie options for access token
   * Centralized configuration to ensure consistency
   */
  private getAccessTokenCookieOptions(): CookieOptions {
    const isProduction = this.configService.get<string>('NODE_ENV') === 'production';
    const maxAge = this.configService.get<number>('COOKIE_ACCESS_TOKEN_MAX_AGE_MS') || 15 * 60 * 1000;
    return {
      httpOnly: false, // Client needs to read this for proactive refresh
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge,
    };
  }

  /**
   * Get cookie options for refresh token
   * Centralized configuration to ensure consistency
   */
  private getRefreshTokenCookieOptions(): CookieOptions {
    const isProduction = this.configService.get<string>('NODE_ENV') === 'production';
    const maxAge = this.configService.get<number>('COOKIE_REFRESH_TOKEN_MAX_AGE_MS') || 7 * 24 * 60 * 60 * 1000;
    return {
      httpOnly: true, // Secure - not accessible by JavaScript
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge,
    };
  }

  async register(dto: RegisterDto, res: Response) {
    const passwordValidation = this.securityService.validatePasswordStrength(dto.password);
    if (!passwordValidation.isStrong) {
      throw new BadRequestException(passwordValidation.errors.join(', '));
    }

    const hash = await bcrypt.hash(
      dto.password,
      this.configService.get<number>('BCRYPT_ROUNDS') || 10,
    );

    try {
      const user = await this.db.client.user.create({
        data: {
          email: dto.email,
          passwordHash: hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
          role: dto.role || 'CLIENT', // Use provided role or default to CLIENT
        },
      });
      
      // Sign token and return (similar to login)
      return this.signToken(user.id, user.email, user.role, res);
    } catch (error) {
      if ((error as any).code === 'P2002') {
        throw new ForbiddenException('Email already registered');
      }
      throw error;
    }
  }

  async login(dto: LoginDto, res: Response) {
    // CRITICAL: Always read fresh user data from database (not cache)
    // This ensures role changes are immediately reflected on next login
    const user = await this.db.client.user.findUnique({
      where: { email: dto.email },
      select: { id: true, email: true, role: true, isActive: true, passwordHash: true },
    });

    if (!user) throw new BadRequestException('Invalid credentials');

    const matches = await bcrypt.compare(dto.password, user.passwordHash);
    if (!matches) throw new BadRequestException('Invalid credentials');

    // Check if user is active
    if (!user.isActive) {
      throw new UnauthorizedException('User account is inactive');
    }

    // CRITICAL: Invalidate cache before generating new token to ensure fresh data
    // This prevents stale cached data from being used by JwtStrategy
    this.userCache.invalidate(user.id);

    // signToken will also read fresh from DB and invalidate cache, but we do it here too for safety
    return this.signToken(user.id, user.email, user.role, res);
  }

  async signToken(userId: string, email: string, role: string, res: Response) {
    // CRITICAL: Invalidate cache FIRST to ensure we don't use stale cached data
    // This is especially important when roles are updated - we want fresh data
    this.userCache.invalidate(userId);

    // CRITICAL: Always read fresh role from database to ensure we have the latest role
    // This prevents stale role issues when roles are updated while user is logged in
    const user = await this.db.client.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, role: true, isActive: true },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('User account is inactive');
    }

    // Use the fresh role from database, not the passed parameter
    const freshRole = user.role;
    const payload = { sub: userId, email: user.email, role: freshRole };

    const accessExpiration =
      this.configService.get<string>('JWT_ACCESS_EXPIRATION') || '15m';
    const refreshExpiration =
      this.configService.get<string>('JWT_REFRESH_EXPIRATION') || '7d';

    // Generate Access Token 
    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: accessExpiration,
      secret: this.configService.get<string>('JWT_SECRET'),
    } as any);

    // Generate Refresh Token 
    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: refreshExpiration,
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    } as any);

    // Set Access Token Cookie using centralized options
    const accessTokenOptions = this.getAccessTokenCookieOptions();
    res.cookie('access_token', accessToken, accessTokenOptions);

    // Set Refresh Token Cookie using centralized options
    const refreshTokenOptions = this.getRefreshTokenCookieOptions();
    res.cookie('brixa_refresh', refreshToken, refreshTokenOptions);

    return { access_token: accessToken };
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies['brixa_refresh'];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    try {
      const payload = await this.jwt.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      // CRITICAL: Invalidate cache BEFORE reading from DB to ensure fresh data
      // This prevents stale cached data from being used
      this.userCache.invalidate(payload.sub);

      // CRITICAL: Always read fresh user data from database (not cache)
      // This ensures role changes are immediately reflected
      const user = await this.db.client.user.findUnique({
        where: { id: payload.sub },
        select: { id: true, email: true, role: true, isActive: true },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      if (!user.isActive) {
        throw new UnauthorizedException('User account is inactive');
      }

      // signToken will also invalidate cache and read fresh from DB, but we do it here too for safety
      return this.signToken(user.id, user.email, user.role, res);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      // Log the error for debugging but don't expose internal details
      console.error('Refresh token validation failed:', error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(res: Response) {
    // CRITICAL: Cookie clearing options MUST match cookie setting options exactly
    // Otherwise browsers will ignore the clearCookie request and cookies persist
    
    // Clear refresh token with exact same options as when it was set
    const refreshTokenOptions = this.getRefreshTokenCookieOptions();
    res.clearCookie('brixa_refresh', {
      httpOnly: refreshTokenOptions.httpOnly,
      secure: refreshTokenOptions.secure,
      sameSite: refreshTokenOptions.sameSite,
      path: refreshTokenOptions.path,
    });

    // Clear access token with exact same options as when it was set
    const accessTokenOptions = this.getAccessTokenCookieOptions();
    res.clearCookie('access_token', {
      httpOnly: accessTokenOptions.httpOnly,
      secure: accessTokenOptions.secure,
      sameSite: accessTokenOptions.sameSite,
      path: accessTokenOptions.path,
    });

    return { message: 'Logged out successfully' };
  }

  decodeRefreshToken(refreshToken: string): any {
    try {
      return this.jwt.decode(refreshToken);
    } catch (error) {
      return null;
    }
  }
}
