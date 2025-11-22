import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';

@Module({
  controllers: [SeedController],
})
export class SeedModule {}