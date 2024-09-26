import { config } from 'dotenv';
import { join } from 'path';

config();

export const serverEnv = process.env;

export const webBuildPath = join(__dirname, '../../web/build');

export const serverVersion = 'v1';
