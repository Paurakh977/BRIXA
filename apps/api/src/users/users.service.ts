import { Injectable } from '@nestjs/common';
import { prisma } from '@BRIXA/database';
import type { Prisma } from '@BRIXA/database';

@Injectable()
export class UsersService {
  create(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  }

  findAll() {
    return prisma.user.findMany({ include: { posts: true } });
  }

  findOne(id: number) {
    return prisma.user.findUnique({ where: { id }, include: { posts: true } });
  }

  update(id: number, data: Prisma.UserUpdateInput) {
    return prisma.user.update({ where: { id }, data });
  }

  remove(id: number) {
    return prisma.user.delete({ where: { id } });
  }
}