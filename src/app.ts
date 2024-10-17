import express from 'express';
import feedRoutes from './routes/feed.routes';

const app = express();

app.use(express.json());

// healthcheck
app.get('/health', (req: express.Request, res: express.Response) => {
  res.sendStatus(200);
});

app.use('/feeds', feedRoutes);

export default app;
