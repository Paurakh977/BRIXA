import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface CachedUser {
  user: any;
  timestamp: number;
  isActive: boolean;
  tokenVersion: number;
  lastDbValidation: number; // Track when we last verified user exists in DB
}

/**
 * In-memory cache service for user data
 * Used to minimize database hits during JWT validation
 * 
 * SECURITY NOTE: Cache has two TTLs:
 * 1. CACHE_TTL (default 5 min) - How long cached data is considered fresh
 * 2. DB_VALIDATION_INTERVAL (default 1 min) - How often to verify user still exists in DB
 */
@Injectable()
export class UserCacheService {
  private userCache = new Map<string, CachedUser>();
  private readonly CACHE_TTL: number;
  private readonly CLEANUP_INTERVAL: number;
  private readonly DB_VALIDATION_INTERVAL: number;

  constructor(private readonly configService: ConfigService) {
    // Get configuration from centralized config (configuration.ts)
    // Defaults are handled in configuration.ts
    this.CACHE_TTL = this.configService.get<number>('cache.ttlMs');
    this.CLEANUP_INTERVAL = this.configService.get<number>('cache.cleanupIntervalMs');
    this.DB_VALIDATION_INTERVAL = this.configService.get<number>('cache.dbValidationIntervalMs');
    
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
   * @returns CachedUser if found and not expired, undefined otherwise
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
   * Check if cached user needs DB validation
   * Returns true if we should verify user still exists in database
   */
  needsDbValidation(userId: string): boolean {
    const cached = this.userCache.get(userId);
    if (!cached) return true; // No cache = needs validation
    
    const now = Date.now();
    return (now - cached.lastDbValidation) > this.DB_VALIDATION_INTERVAL;
  }

  /**
   * Update the lastDbValidation timestamp after successful DB check
   */
  updateDbValidationTime(userId: string) {
    const cached = this.userCache.get(userId);
    if (cached) {
      cached.lastDbValidation = Date.now();
    }
  }

  /**
   * Set user in cache
   */
  set(userId: string, user: any) {
    const now = Date.now();
    this.userCache.set(userId, {
      user,
      timestamp: now,
      isActive: user.isActive,
      tokenVersion: user.tokenVersion ?? 0,
      lastDbValidation: now, // Just validated from DB
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
