import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function test() {
  const addresses = await prisma.target.findMany({
    where: {},
    include: { Services: true },
  });
  console.log('addresses', addresses);
}

test();
