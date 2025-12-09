import { Injectable } from '@nestjs/common';

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
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache TTL

  constructor() {
    // Clean up expired cache entries every 10 minutes
    setInterval(() => this.cleanupCache(), 10 * 60 * 1000);
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
