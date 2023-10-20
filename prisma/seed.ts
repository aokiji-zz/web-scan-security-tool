import { Prisma, PrismaClient } from '.prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
async function seed() {
  const targets: Prisma.ServiceCreateManyInput[] = [];
  for (let i = 0; i < 10000; i++) {
    const data: Prisma.ServiceCreateManyInput = {
      port: faker.internet.port(),
      protocol: faker.internet.protocol().toString(),
      service: faker.internet.displayName(),
      state: faker.company.name(),
    };
    targets.push(data);
  }
  await prisma.service.createMany({ data: targets });
}
seed();
