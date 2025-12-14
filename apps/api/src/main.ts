import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const configService = app.get(ConfigService);

  const hstsMaxAge = configService.get<number>('HSTS_MAX_AGE') || 31536000; // 1 year in seconds
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", 'data:', 'https:'],
        },
      },
      hsts: {
        maxAge: hstsMaxAge,
        includeSubDomains: true,
        preload: true,
      },
      frameguard: {
        action: 'deny',
      },
      referrerPolicy: {
        policy: 'strict-origin-when-cross-origin',
      },
    }),
  );

  // Compression for responses
  app.use(compression());

  const sessionSecret = configService.get<string>('SESSION_SECRET') || 'secret';
  app.use(cookieParser(sessionSecret));

  const corsOrigin = configService.get<string>('CORS_ORIGIN') || 'http://localhost:3000';
  const corsMaxAge = configService.get<number>('CORS_MAX_AGE') || 86400; // 1 day in seconds
  app.enableCors({
    origin: corsOrigin,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'Cookie',
    ],
    exposedHeaders: ['Set-Cookie'],
    maxAge: corsMaxAge,
  });

  // 5. Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove properties not defined in DTO
      forbidNonWhitelisted: true, // Throw error for extra properties
      transform: true, // Auto-transform payloads
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // 6. Global Class Serializer Interceptor
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const port = configService.get<number>('APP_PORT') || 8000;
  const nodeEnv = configService.get<string>('NODE_ENV') || 'development';

  await app.listen(port);
  logger.log(`Application is running on port ${port}`);
  logger.log(`Environment: ${nodeEnv}`);
}

bootstrap().catch((err) => {
  console.error('Failed to start application:', err);
  process.exit(1);
});