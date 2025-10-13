import app from './config/server.config';
import _connect from './database';
import { SERVER_PORT } from './config/env.config';

_connect();

if (process.env.VERCEL === undefined) {
  app.listen(SERVER_PORT, () => {
    console.info(`Server running on http://localhost:${SERVER_PORT}`);
  });
}