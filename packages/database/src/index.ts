export { prisma } from './client';

// Only export the main Class and Types you actually need.
// This prevents TS from trying to re-export 'DbNull' and crashing.
export type {
  User,
  Post,
  Prisma,
  PrismaClient
} from "../generated/prisma/client";