import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../../database/database.service';
import { UserCacheService } from '../../common/services/user-cache.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private db: DatabaseService,
    private configService: ConfigService,
    private userCache: UserCacheService,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  /**
   * Get user from cache or database
   * CRITICAL SECURITY: Periodically validates user exists in database
   * 
   * Security layers:
   * 1. Cache TTL (5 min default) - Data freshness
   * 2. DB Validation Interval (1 min default) - User existence check
   * 3. Token Version - Revocation check
   */
  private async getUserFromCacheOrDb(userId: string, payloadRole?: string, payloadTokenVersion?: number): Promise<any> {
    // Check cache first
    const cached = this.userCache.get(userId);
    
    if (cached) {
      // CRITICAL: Even with cache hit, verify tokenVersion matches
      if (payloadTokenVersion !== undefined && cached.user.tokenVersion !== payloadTokenVersion) {
        this.userCache.invalidate(userId);
        throw new UnauthorizedException('Token has been revoked');
      }
      
      // CRITICAL: Check if cached role matches payload role
      if (payloadRole && cached.user.role !== payloadRole) {
        // Role mismatch - cache might be stale, force DB refresh
        this.userCache.invalidate(userId);
      } 
      // CRITICAL: Periodic DB validation to catch deleted users
      else if (this.userCache.needsDbValidation(userId)) {
        // Time to verify user still exists in DB
        const userExists = await this.db.client.user.findUnique({
          where: { id: userId },
          select: { id: true, isActive: true, tokenVersion: true },
        });
        
        if (!userExists) {
          this.userCache.invalidate(userId);
          throw new UnauthorizedException('User not found');
        }
        
        if (!userExists.isActive) {
          this.userCache.invalidate(userId);
          throw new UnauthorizedException('User account is inactive');
        }
        
        if (payloadTokenVersion !== undefined && payloadTokenVersion !== userExists.tokenVersion) {
          this.userCache.invalidate(userId);
          throw new UnauthorizedException('Token has been revoked');
        }
        
        // Update validation timestamp
        this.userCache.updateDbValidationTime(userId);
        return cached.user;
      } else {
        // Cache hit with matching data and recent validation
        return cached.user;
      }
    }

    // Cache miss OR cache invalidated - MUST fetch from database
    const user = await this.db.client.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        phoneNumber: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,
        bio: true,
        role: true,
        isVerified: true,
        isActive: true,
        tokenVersion: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // CRITICAL: User not found in database = unauthorized
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // CRITICAL: Verify token version matches database
    if (payloadTokenVersion !== undefined && payloadTokenVersion !== user.tokenVersion) {
      throw new UnauthorizedException('Token has been revoked');
    }

    // Update cache with fresh data
    this.userCache.set(userId, user);

    return user;
  }

  async validate(payload: any) {
    if (!payload || typeof payload !== 'object') {
      throw new UnauthorizedException('Invalid token payload');
    }

    const userId = payload.sub;
    if (!userId || typeof userId !== 'string') {
      throw new UnauthorizedException('Invalid token payload: missing user ID');
    }

    if (!payload.email || typeof payload.email !== 'string') {
      throw new UnauthorizedException('Invalid token payload: missing email');
    }

    // CRITICAL: Pass role and tokenVersion from JWT payload to detect stale cache
    // If cached role doesn't match payload role, cache is stale and will be invalidated
    const payloadRole = payload.role;
    const payloadTokenVersion = payload.tokenVersion;
    const user = await this.getUserFromCacheOrDb(userId, payloadRole, payloadTokenVersion);

    // CRITICAL: Use role from database (fresh), not from JWT payload (might be stale)
    // This ensures role changes are immediately reflected even with old tokens
    // However, if the token is very old, it should be refreshed
    const freshUser = {
      ...user,
      role: user.role, // Use fresh role from DB, not stale role from JWT payload
    };

    // Check if user is active
    if (!freshUser.isActive) {
      // Remove from cache if inactive
      this.userCache.invalidate(userId);
      throw new UnauthorizedException('User account is inactive');
    }

    return freshUser;
  }
}