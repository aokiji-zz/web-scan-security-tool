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
app.post(
  '/sendTargets',
  async (req: { body: ITcpScanResponse[] }, res: any) => {
    if (!req.body) return null;
    const payload: Prisma.TargetCreateManyInput[] = req?.body?.flatMap(
      (value) => {
        return value?.address?.map((address) => {
          const services = value?.ports?.[0]?.flatMap((port) => {
            return {
              port: parseInt(port?.number, 10) || 0,
              protocol: port?.protocol,
              service: port?.service,
              state: port?.state,
              product: port?.product,
              version: port?.version,
            };
          });
          return {
            ipAddress: address?.addr,
            domain: '',
            url: '',
            Services: {
              create: services,
            },
          };
        });
      }
    );
    payload.map(async (element) => {
      await prisma.target.create({ data: element });
    });
    console.log('Saved target!!');
    return res.send({ status: 'ok' });
  }
);
app.get('/targets', async (req, res: any) => {
  if (!req.body) return null;
  console.log('req', req?.body);
  return res.send({ status: 'ok' });
});

app.get('/:target', async (req, res: any) => {
  if (!req.body) return null;

  return res.send({ status: 'ok' });
});
app.listen(PORT, () => {
  console.log('running in', PORT);
});
