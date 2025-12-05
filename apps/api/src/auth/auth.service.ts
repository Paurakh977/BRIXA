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

@Injectable()
export class AuthService {
  constructor(
    private db: DatabaseService,
    private jwt: JwtService,
    private configService: ConfigService,
    private securityService: SecurityService,
  ) {}

  async register(dto: RegisterDto) {
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
          role: 'CLIENT', // Default role
        },
      });
      // Remove password before returning
      const { passwordHash, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      if ((error as any).code === 'P2002') {
        throw new ForbiddenException('Email already registered');
      }
      throw error;
    }
  }

  async login(dto: LoginDto, res: Response) {
    const user = await this.db.client.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new BadRequestException('Invalid credentials');

    const matches = await bcrypt.compare(dto.password, user.passwordHash);
    if (!matches) throw new BadRequestException('Invalid credentials');

    return this.signToken(user.id, user.email, user.role, res);
  }

  async signToken(userId: string, email: string, role: string, res: Response) {
    const payload = { sub: userId, email, role };

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

    // Set Refresh Token in HTTP-ONLY Cookie
    res.cookie('brixa_refresh', refreshToken, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

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

      const user = await this.db.client.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return this.signToken(user.id, user.email, user.role, res);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(res: Response) {
    res.clearCookie('brixa_refresh', { path: '/' });
    return { message: 'Logged out successfully' };
  }
}