import express from 'express';
import routes from './router/index.routes';
import { logger } from './middleware/logger';

const app = express();

app.use(express.json());

app.use(logger);
app.use(routes);

export default app;
