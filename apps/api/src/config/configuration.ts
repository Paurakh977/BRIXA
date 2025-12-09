import { Expose, plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  // --- 1. Define Defaults & Expose Fields ---
  // @Expose() is REQUIRED here to filter out the npm_... junk variables

  @Expose()
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment = Environment.Development;

  @Expose()
  @IsNumber()
  @IsOptional()
  APP_PORT: number = 8000;

  @Expose()
  @IsString()
  @IsOptional()
  APP_URL: string = 'http://localhost:8000';

  @Expose()
  @IsString()
  DATABASE_URL: string; // Required

  @Expose()
  @IsString()
  JWT_SECRET: string; // Required

  @Expose()
  @IsString()
  JWT_REFRESH_SECRET: string; // Required

  @Expose()
  @IsString()
  @IsOptional()
  JWT_ACCESS_EXPIRATION: string = '15m';

  @Expose()
  @IsString()
  @IsOptional()
  JWT_REFRESH_EXPIRATION: string = '7d';

  @Expose()
  @IsString()
  @IsOptional()
  CORS_ORIGIN: string = 'http://localhost:3000';

  @Expose()
  @IsNumber()
  @IsOptional()
  RATE_LIMIT_WINDOW_MS: number = 900000;

  @Expose()
  @IsNumber()
  @IsOptional()
  RATE_LIMIT_MAX_REQUESTS: number = 100;

  @Expose()
  @IsString()
  API_KEY: string; // Required

  @Expose()
  @IsNumber()
  @IsOptional()
  BCRYPT_ROUNDS: number = 10;

  @Expose()
  @IsString()
  SESSION_SECRET: string; // Required

  @Expose()
  @IsString()
  @IsOptional()
  LOG_LEVEL: string = 'debug';
}

export function validate(config: Record<string, unknown>) {
  // 1. Transform raw config to Class
  // excludeExtraneousValues: true -> This removes all the npm_ junk variables
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true, 
  });

  // 2. Validate constraints
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  // 3. Print Status (Unmasked)
  console.log('\n--- 🔧 ENVIRONMENT CONFIGURATION ---');
  
  Object.keys(validatedConfig).forEach((key) => {
    const isSetInEnv = config[key] !== undefined;
    const finalValue = validatedConfig[key];

    if (!isSetInEnv) {
      // Missing in .env, using Class Default
      console.log(`⚠️  ${key.padEnd(25)} : Not set. Using Default -> ${finalValue}`);
    } else {
      // Set in .env
      console.log(`✅ ${key.padEnd(25)} : Set by Env. Value     -> ${finalValue}`);
    }
  });
  console.log('------------------------------------\n');

  return validatedConfig;
}

export function configuration() {
  return {
    app: {
      port: parseInt(process.env.APP_PORT, 10) || 8000,
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
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 900000,
      maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
    },
    security: {
      bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS, 10) || 10,
      sessionSecret: process.env.SESSION_SECRET,
    },
    logging: {
      level: process.env.LOG_LEVEL || 'debug',
    },
  };
}