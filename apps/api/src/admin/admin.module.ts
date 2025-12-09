import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { DatabaseModule } from '../database/database.module';
import { SecurityService } from '../common/services/security.service';
import { UserCacheService } from '../common/services/user-cache.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AdminController],
  providers: [AdminService, SecurityService, UserCacheService],
})
export class AdminModule {}