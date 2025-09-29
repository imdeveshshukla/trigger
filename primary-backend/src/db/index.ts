import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // enables logging
});
async function connectDb() {
  try {
    await prismaClient.$connect();
    console.log('✅ Database connected successfully');
  } catch (err) {
    console.error('❌ Failed to connect to database', err);
    process.exit(1); // optional: stop app if db not connected
  }
}

connectDb();
