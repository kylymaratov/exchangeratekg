import express from 'express';

import './path-register';
import './cron/cron';

import { setServerMiddlewares } from '@/server/server-middlewares';
import { startServer } from '@/server/server-run';
import { parseValutaKgWebsite } from './parser';

const app = express();

async function bootstrap() {
  try {
    setServerMiddlewares(app);

    await startServer(app);
  } catch (error) {
    console.error(`Server failed with error: ${error}`);
  }
}

bootstrap();
