import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { ITcpScanResponse } from '../../../src/tools/network-scan/types';

dotenv.config();

// UJ8aDkFAcHiLf9Op
// ZyQNDOQI1o772WQE password mongo
const corsOptions = {
  methods: ['POST'],
  origin: ['http:localhost:1212'],
  allowHeaders: ['Content-Type'],
};
const PORT = process.env.ENDPOINT_PORT;
const prisma = new PrismaClient();
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.post('/sendTarget', async (req: { body: ITcpScanResponse[] }, res: any) => {
  if (!req.body) return null;
  const payload = req.body.flatMap((value) => {
    return value.address.map((address) => {
      return {
        internalIp: address.addr,
      };
    });
  });
  console.log('payload', payload);
  await prisma.target.createMany({
    data: payload,
  });

  return res.send({ status: 'ok' });
});
app.get('/targets', async (req, res: any) => {
  if (!req.body) return null;
  console.log('req', req?.body);
  //   const a = await prisma.target.create({
  //     data: {
  //       domain: req.body.domain,
  //       externalIp: req.body.domain,
  //       internalIp: req.body.domain,
  //       url: req.body.domain,
  //     },
  //   });
  return res.send({ status: 'ok' });
});

app.get('/:target', async (req, res: any) => {
  if (!req.body) return null;
  console.log('req', req?.body);
  //   const a = await prisma.target.create({
  //     data: {
  //       domain: req.body.domain,
  //       externalIp: req.body.domain,
  //       internalIp: req.body.domain,
  //       url: req.body.domain,
  //     },
  //   });
  return res.send({ status: 'ok' });
});
app.listen(PORT, () => {
  console.log('running in', PORT);
});
