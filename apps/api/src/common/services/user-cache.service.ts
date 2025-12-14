import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface CachedUser {
  user: any;
  timestamp: number;
  isActive: boolean;
}

/**
 * In-memory cache service for user data
 * Used to minimize database hits during JWT validation
 */
@Injectable()
export class UserCacheService {
  private userCache = new Map<string, CachedUser>();
  private readonly CACHE_TTL: number;
  private readonly CLEANUP_INTERVAL: number;

  constructor(private configService: ConfigService) {
    // Get cache TTL from environment or use default (5 minutes)
    this.CACHE_TTL = this.configService.get<number>('CACHE_TTL_MS') || 5 * 60 * 1000;
    
    // Get cleanup interval from environment or use default (10 minutes)
    this.CLEANUP_INTERVAL = this.configService.get<number>('CACHE_CLEANUP_INTERVAL_MS') || 10 * 60 * 1000;
    
    // Clean up expired cache entries at configured interval
    setInterval(() => this.cleanupCache(), this.CLEANUP_INTERVAL);
  }

  /**
   * Remove expired cache entries
   */
  private cleanupCache() {
    const now = Date.now();
    for (const [key, value] of this.userCache.entries()) {
      if (now - value.timestamp > this.CACHE_TTL) {
        this.userCache.delete(key);
      }
    }
  }

  /**
   * Get user from cache
   */
  get(userId: string): CachedUser | undefined {
    const cached = this.userCache.get(userId);
    if (cached) {
      const now = Date.now();
      if (now - cached.timestamp < this.CACHE_TTL) {
        return cached;
      }
      // Expired, remove it
      this.userCache.delete(userId);
    }
    return undefined;
  }

  /**
   * Set user in cache
   */
  set(userId: string, user: any) {
    this.userCache.set(userId, {
      user,
      timestamp: Date.now(),
      isActive: user.isActive,
    });
  }

  /**
   * Invalidate cache for a user
   */
  invalidate(userId: string) {
    this.userCache.delete(userId);
  }

  /**
   * Invalidate all cache entries
   */
  invalidateAll() {
    this.userCache.clear();
  }

  /**
   * Get cache size (for monitoring)
   */
  getSize(): number {
    return this.userCache.size;
  }
}
