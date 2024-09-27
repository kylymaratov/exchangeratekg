import { Express, Request, Response } from 'express';
import http from 'http';
import { serverEnv, webBuildPath } from './server-env';
import { connectionDatabase } from '@/database/connection';
import { WebSockets } from '@/websocket/web-socket';
import { SubscriptionSocket } from '@/websocket/subscription';

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

  const server = http.createServer(app);

  const io = WebSockets.getInstance(server);

  app.get('*', sendIndexFile);

  io.initializeHandlers([
    { path: '/subscription', handler: new SubscriptionSocket() },
  ]);

  server.listen(serverEnv.PORT, afterStart);
};
