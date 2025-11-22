import { prisma } from "./client";

export async function runSeed() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: {
      email: "alice@example.com",
      name: "Alice",
      posts: {
        create: [
          { title: "Hello World", content: "First post", published: true },
          { title: "Draft Post", content: "Work in progress", published: false },
        ],
      },
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: {
      email: "bob@example.com",
      name: "Bob",
    },
  });

  const post = await prisma.post.create({
    data: {
      title: "Bob's First Post",
      content: "Learning Prisma",
      published: true,
      authorId: bob.id,
    },
  });

  return { users: 2, posts: 3, createdIds: { aliceId: alice.id, bobId: bob.id, postId: post.id } };
}