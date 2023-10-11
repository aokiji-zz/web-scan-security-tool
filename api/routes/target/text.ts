import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function test() {
  const services = await prisma.service.findMany({
    where: {},
    // include: { Services: true },
  });
  const count = await prisma.service.count({ where: {} });
  console.log('addresses', services);
  console.log('count', count);
}

test();
