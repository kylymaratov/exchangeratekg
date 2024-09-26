import { Express, Request, Response } from 'express';
import { serverEnv, webBuildPath } from './server-env';
import { connectionDatabase } from '@/database/connection';

const beforeStart = async () => {
  await connectionDatabase(serverEnv.DB_URL || '', {});
};

const afterStart = () => {
  console.log(`Server running and listen ${serverEnv.PORT}...`);
};

const sendIndexFile = (req: Request, res: Response) => {
  return res.sendFile(webBuildPath + '/index.html');
};

export const startServer = async (app: Express) => {
  await beforeStart();

  app.get('/', sendIndexFile);

  app.listen(serverEnv.PORT, afterStart);
};
