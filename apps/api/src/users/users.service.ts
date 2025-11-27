import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from '@BRIXA/api'; // Import from shared package
import { Prisma } from '@BRIXA/database';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async create(data: CreateUserDto) {
    return this.db.client.user.create({ data });
  }

  async findAll() {
    return this.db.client.user.findMany({
      include: { posts: true }, // Include posts so we can count them in UI
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.db.client.user.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    return this.db.client.user.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.db.client.user.delete({ where: { id } });
  }
}