try {
  require("dotenv/config");
} catch (e) {
  console.log("dotenv/config not found messgae from ./prisma.config.ts");
}

import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
  seed: {
    command: "pnpm run seed:run", 
  },
});