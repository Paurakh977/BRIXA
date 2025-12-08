/**
 * JWT utility functions for Edge runtime (middleware)
 * Uses jose library for cryptographic signature verification
 */

import { jwtVerify } from 'jose';

export interface JWTPayload {
  sub: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

/**
 * Configuration Error - thrown when server is misconfigured
 * This error should NOT be caught and should cause the application to fail
 */
export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ConfigurationError);
    }
  }
}

/**
 * Get JWT secret key for verification
 * Must match the backend JWT_SECRET
 * @throws {ConfigurationError} If JWT_SECRET is not defined
 */
function getJWTSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new ConfigurationError(
      'JWT_SECRET is not defined in environment variables. ' +
      'Please add JWT_SECRET to your web app\'s environment configuration (apps/web/.env or deployment settings).'
    );
  }
  // Convert string secret to Uint8Array for jose
  return new TextEncoder().encode(secret);
}

/**
 * Verify and decode JWT token with cryptographic signature verification
 * @param token JWT token string
 * @returns Verified payload or null if invalid/expired
 * @throws {ConfigurationError} If JWT_SECRET is missing (server misconfiguration)
 */
export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const secret = getJWTSecret();
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ['HS256'], // Match your backend algorithm
    });

    // Type guard to ensure payload has required fields
    if (
      typeof payload.sub === 'string' &&
      typeof payload.email === 'string' &&
      typeof payload.role === 'string'
    ) {
      return {
        sub: payload.sub,
        email: payload.email,
        role: payload.role,
        iat: typeof payload.iat === 'number' ? payload.iat : undefined,
        exp: typeof payload.exp === 'number' ? payload.exp : undefined,
      };
    }

    return null;
  } catch (error) {
    // Re-throw ConfigurationError - do NOT catch and return null
    // This ensures configuration errors cause the application to fail
    if (error instanceof ConfigurationError) {
      throw error;
    }
    
    // Only return null for token validation errors (invalid signature, expired, etc.)
    // These are expected errors that should be handled gracefully
    return null;
  }
}

/**
 * Check if token is expired or about to expire (for proactive refresh)
 * @param payload Verified JWT payload
 * @param bufferSeconds Buffer time in seconds before expiration (default: 60)
 * @returns true if expired or expiring soon
 */
export function isTokenExpiring(
  payload: JWTPayload | null,
  bufferSeconds: number = 60
): boolean {
  if (!payload || !payload.exp) {
    return true;
  }

  const expirationTime = payload.exp * 1000; // Convert to milliseconds
  const currentTime = Date.now();
  const bufferTime = bufferSeconds * 1000;

  return currentTime >= expirationTime - bufferTime;
}
