import { plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  APP_PORT: number;

  @IsString()
  APP_URL: string;

  @IsString()
  DATABASE_URL: string;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  JWT_REFRESH_SECRET: string;

  @IsString()
  JWT_ACCESS_EXPIRATION: string;

  @IsString()
  JWT_REFRESH_EXPIRATION: string;

  @IsString()
  CORS_ORIGIN: string;

  @IsNumber()
  RATE_LIMIT_WINDOW_MS: number;

  @IsNumber()
  RATE_LIMIT_MAX_REQUESTS: number;

  @IsString()
  API_KEY: string;

  @IsNumber()
  BCRYPT_ROUNDS: number;

  @IsString()
  SESSION_SECRET: string;

  @IsString()
  LOG_LEVEL: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}

export function configuration() {
  return {
    app: {
      port: parseInt(process.env.APP_PORT) || 8000,
      url: process.env.APP_URL || 'http://localhost:8000',
      env: process.env.NODE_ENV || Environment.Development,
    },
    database: {
      url: process.env.DATABASE_URL,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      refreshSecret: process.env.JWT_REFRESH_SECRET,
      accessExpiration: process.env.JWT_ACCESS_EXPIRATION || '15m',
      refreshExpiration: process.env.JWT_REFRESH_EXPIRATION || '7d',
    },
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    },
    rateLimit: {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
      maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    },
    security: {
      bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 10,
      sessionSecret: process.env.SESSION_SECRET,
    },
    logging: {
      level: process.env.LOG_LEVEL || 'debug',
    },
  };
}
