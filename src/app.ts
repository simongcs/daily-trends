import express from 'express';
import feedRoutes from './routes/feed.routes';
import Database from './config/db';
import config from './config/config';

const db = new Database(config.DB_CONNECTION_STRING);
db.connect();
const app = express();

app.use(express.json());

// healthcheck
app.get('/health', (req: express.Request, res: express.Response) => {
  res.sendStatus(200);
});

app.use('/feeds', feedRoutes);

export default app;
