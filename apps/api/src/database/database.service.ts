import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { prisma, PrismaClient } from '@BRIXA/database';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  public get client(): PrismaClient {
    return prisma;
  }

  async onModuleInit() {
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }

  // 👇 The Logic for your "Reset & Seed" Button
  async resetAndSeed() {
    // 1. Clean Database
    await this.client.post.deleteMany();
    await this.client.user.deleteMany();

    // 2. Create Seed Data
    const alice = await this.client.user.create({
      data: {
        email: 'alice@brixa.com',
        name: 'Alice Brixa',
        posts: {
          create: [
            { title: 'First Post', content: 'Hello World', published: true },
            { title: 'Draft Post', content: 'Working on it...', published: false },
          ],
        },
      },
    });

    const bob = await this.client.user.create({
      data: {
        email: 'bob@brixa.com',
        name: 'Bob Brixa',
        posts: {
          create: [
            { title: 'Bob Logic', content: 'NestJS is cool', published: true },
          ],
        },
      },
    });

    return { message: 'Database reset and seeded', users: [alice, bob] };
  }
}