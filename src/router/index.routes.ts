import { Router } from 'express';
import userRouter from './user.routes';
import authRouter from './auth.routes';
import productRouter from './product.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/auth', authRouter);
routes.use('/products', productRouter);

export default routes;
