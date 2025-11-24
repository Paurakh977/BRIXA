import 'dotenv/config';
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error('❌ DATABASE_URL is undefined in client.ts. Make sure .env is loaded.');
}

console.log('🔌 Connecting to DB:', url.replace(/:([^@]+)@/, ':****@')); // Log masked URL

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma || new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;