import { Injectable } from '@nestjs/common';

@Injectable()
export class RateLimitService {
  private requestCounts: Map<string, { count: number; timestamp: number }> =
    new Map();

  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(windowMs: number = 900000, maxRequests: number = 100) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  isRateLimited(identifier: string): boolean {
    const now = Date.now();
    const record = this.requestCounts.get(identifier);

    if (!record) {
      this.requestCounts.set(identifier, {
        count: 1,
        timestamp: now,
      });
      return false;
    }

    if (now - record.timestamp > this.windowMs) {
      // Reset the window
      this.requestCounts.set(identifier, {
        count: 1,
        timestamp: now,
      });
      return false;
    }

    record.count++;

    if (record.count > this.maxRequests) {
      return true;
    }

    return false;
  }
}
