import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreatePostDto } from '@BRIXA/api'; // Shared DTO
import { Prisma } from '@BRIXA/database';

@Injectable()
export class PostsService {
  constructor(private readonly db: DatabaseService) {}

  async create(data: CreatePostDto) {
    return this.db.client.post.create({
      data: {
        title: data.title,
        content: data.content,
        published: data.published ?? false,
        author: {
          connect: { id: data.authorId }, // Connect relationship
        },
      },
    });
  }

  async findAll() {
    return this.db.client.post.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.db.client.post.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.PostUpdateInput) {
    return this.db.client.post.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.db.client.post.delete({ where: { id } });
  }
}