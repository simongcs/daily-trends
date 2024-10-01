import express from 'express';

const app = express();

// healthcheck
app.get('/health', (req: express.Request, res: express.Response) => {
  res.sendStatus(200);
});

export default app;
