import { prisma } from '../src/client'; // Ensure client.ts exists in src
// If you need types:
// import type { User } from '../generated/prisma/client';

async function main() {
  console.log('🌱 Starting seeding...');
  
  // Simple check to ensure connection works
  try {
    await prisma.$connect();
    console.log('✅ Connected to database');
  } catch (e) {
    console.error('❌ Failed to connect', e);
    process.exit(1);
  }

  // 1. Cleanup
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Data
  const user1 = await prisma.user.upsert({
    where: { email: 'alice@brixa.com' },
    update: {},
    create: {
      email: 'alice@brixa.com',
      name: 'Alice Brixa',
      posts: {
        create: [
          { title: 'Turbo Repo Power', published: true },
          { title: 'Prisma Config', published: false },
        ],
      },
    },
  });

  console.log({ user1 });
  console.log('✅ Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });