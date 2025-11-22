import { Controller, Post } from '@nestjs/common';
import { runSeed } from '@BRIXA/database';

@Controller('seed')
export class SeedController {
  @Post()
  async seed() {
    const result = await runSeed();
    return { status: 'ok', ...result };
  }
}