import { Injectable } from '@nestjs/common';
import { prisma } from '@BRIXA/database';
import type { Prisma } from '@BRIXA/database';

@Injectable()
export class PostsService {
  create(data: Prisma.PostUncheckedCreateInput) {
    return prisma.post.create({ data });
  }

  findAll() {
    return prisma.post.findMany({ include: { author: true } });
  }

  findOne(id: number) {
    return prisma.post.findUnique({ where: { id }, include: { author: true } });
  }

  update(id: number, data: Prisma.PostUncheckedUpdateInput) {
    return prisma.post.update({ where: { id }, data });
  }

  remove(id: number) {
    return prisma.post.delete({ where: { id } });
  }
}