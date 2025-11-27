import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dbService: DatabaseService // Inject DB Service
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 👇 Endpoint called by React Button
  @Post('seed')
  async seedDatabase() {
    return this.dbService.resetAndSeed();
  }
}