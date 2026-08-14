import { seedIfEmpty } from "./seed-core";

async function seed() {
  await seedIfEmpty();
  process.exit(0); // close MySQL connection pool
}

seed();
