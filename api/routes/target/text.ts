import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function test() {
  const addresses = await prisma.target.findMany();
  console.log('addresses', addresses);
}

test();
