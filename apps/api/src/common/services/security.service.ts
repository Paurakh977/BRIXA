import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

/**
 * Security utility service for common security operations
 */
@Injectable()
export class SecurityService {
  /**
   * Generate a cryptographically secure random token
   * Useful for password reset tokens, API keys, etc.
   */
  generateSecureToken(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

  /**
   * Generate a UUID
   */
  generateUUID(): string {
    return crypto.randomUUID();
  }

  /**
   * Hash sensitive data using SHA256
   * Note: Use bcrypt for passwords, this is for other data
   */
  hashData(data: string, salt: string = ''): string {
    return crypto
      .createHash('sha256')
      .update(data + salt)
      .digest('hex');
  }

  /**
   * Verify hash matches data
   */
  verifyHash(data: string, hash: string, salt: string = ''): boolean {
    return this.hashData(data, salt) === hash;
  }

  /**
   * Check if password meets complexity requirements
   */
  validatePasswordStrength(password: string): {
    isStrong: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (!/[!@#$%^&*]/.test(password)) {
      errors.push(
        'Password must contain at least one special character (!@#$%^&*)',
      );
    }

    return {
      isStrong: errors.length === 0,
      errors,
    };
  }

  /**
   * Sanitize user input to prevent XSS
   */
  sanitizeInput(input: string): string {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  /**
   * Generate a CSRF token
   */
  generateCSRFToken(): string {
    return this.generateSecureToken(32);
  }

  /**
   * Rate limit checker (simple in-memory implementation)
   * For production, use Redis
   */
  private rateLimitStore: Map<
    string,
    { count: number; resetTime: number }
  > = new Map();

  checkRateLimit(
    identifier: string,
    maxAttempts: number = 5,
    windowMs: number = 60000, // 1 minute
  ): { allowed: boolean; remaining: number; resetIn: number } {
    const now = Date.now();
    const record = this.rateLimitStore.get(identifier);

    if (!record || now > record.resetTime) {
      this.rateLimitStore.set(identifier, {
        count: 1,
        resetTime: now + windowMs,
      });
      return {
        allowed: true,
        remaining: maxAttempts - 1,
        resetIn: windowMs,
      };
    }

    record.count++;

    return {
      allowed: record.count <= maxAttempts,
      remaining: Math.max(0, maxAttempts - record.count),
      resetIn: record.resetTime - now,
    };
  }

  /**
   * Clear rate limit for identifier
   */
  clearRateLimit(identifier: string): void {
    this.rateLimitStore.delete(identifier);
  }
}
