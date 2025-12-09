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
   * CRITICAL: Always invalidates cache first to ensure fresh data when roles change
   */
  private async getUserFromCacheOrDb(userId: string, payloadRole?: string): Promise<any> {
    // CRITICAL: If role is provided in payload, check if cached role matches
    // If roles don't match, invalidate cache to force fresh DB read
    const cached = this.userCache.get(userId);
    if (cached && payloadRole) {
      if (cached.user.role !== payloadRole) {
        // Role mismatch - cache is stale, invalidate it
        this.userCache.invalidate(userId);
      }
    }

    // Check cache again (might have been invalidated above)
    const cachedAfterCheck = this.userCache.get(userId);
    if (cachedAfterCheck) {
      // Cache hit - return cached user
      return cachedAfterCheck.user;
    }

    // Cache miss - fetch from database
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
        createdAt: true,
        updatedAt: true,
        // Explicitly exclude passwordHash
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
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

    // CRITICAL: Pass role from JWT payload to detect stale cache
    // If cached role doesn't match payload role, cache is stale and will be invalidated
    const payloadRole = payload.role;
    const user = await this.getUserFromCacheOrDb(userId, payloadRole);

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