import { PrismaClient } from "@prisma/client";
// import { Pool } from "@neondatabase/serverless";
// import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = `${process.env.DATABASE_URL}`;
// const pool = new Pool({ connectionString });
// const adapter = new PrismaNeon(pool);

export const prisma = new PrismaClient();
