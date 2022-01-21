import { Router } from 'express';
import accessTokenMiddleware from '../middlewares/accessTokenMiddleware.js';
import boardRouter from './boardRouter.js';
import cardRouter from './cardRouter.js';

const baseRouter = Router();

baseRouter.use('/api/card', accessTokenMiddleware, cardRouter);
baseRouter.use('/api/board', accessTokenMiddleware, boardRouter);

export default baseRouter;
