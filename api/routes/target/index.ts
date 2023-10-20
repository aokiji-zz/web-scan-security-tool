import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Prisma, PrismaClient } from '@prisma/client';
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
app.post('/sendServices', async (req: { body: ITcpScanResponse[] }, res) => {
  if (!req.body) return null;

  const payload = req?.body?.flatMap<Prisma.ServiceCreateManyInput>((value) => {
    return value?.ports?.[0]?.flatMap((port) => {
      return {
        port: parseInt(port?.number, 10),
        protocol: port?.protocol,
        service: port?.service,
        state: port?.state,
        product: port?.product,
        version: port?.version,
      };
    });
  });
  await prisma.service.createMany({
    data: payload.filter((e) => e !== undefined),
  });
  return res.status(200).send(payload);
});
app.listen(PORT, () => {
  console.log('running in', PORT);
});
