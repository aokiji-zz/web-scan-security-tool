import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function test() {
  const addresses = await prisma.target.findMany({
    where: {},
    include: { Services: true },
  });
  const count = await prisma.target.count({ where: {} });
  console.log(
    'addresses',
    addresses.map((e) => e.Services.map((el) => el))
  );
  console.log('count', count);
}

test();
