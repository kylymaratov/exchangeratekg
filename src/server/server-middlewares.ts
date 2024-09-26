import { Express, static as static_ } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { serverVersion, webBuildPath } from './server-env';
import apiRouter from '@/api';

const serverCors = cors({
  origin: '*',
  preflightContinue: false,
  methods: '*',
});

const serverStatic = () => static_(webBuildPath);

const bodyParserJson = bodyParser.json();

export const setServerMiddlewares = (app: Express) => {
  app.use(serverCors);
  app.use(bodyParserJson);
  app.use(serverStatic());
  app.use(`/api/${serverVersion}/`, apiRouter);
};
