import { Module } from '@nestjs/common';

import { LinksModule } from './links/links.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { SeedModule } from './seed/seed.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [LinksModule, UsersModule, PostsModule, SeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
