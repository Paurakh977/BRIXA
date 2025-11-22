import { runSeed } from "../src/seed";
import { prisma } from "../src/client";

async function main() {
  console.log("Seeding database...");
  const result = await runSeed();
  console.log("Seed complete", result);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });