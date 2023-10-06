// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//   const newUser = await prisma.target.create({
//     data: {
//       externalIp: '192.168.0.1',
//       domain: '',
//       url: '',
//     },
//   });

//   console.log(newUser);
//   const user = await prisma.target.findUnique({
//     where: { id: newUser.id },
//   });
//   console.log('user', user);
// }

// // eslint-disable-next-line promise/catch-or-return
// main()
//   .catch((e) => {
//     throw e;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
