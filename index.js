import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cardRouter from './routers/cardRouter.js';
import boardRouter from './routers/boardRouter.js';
import jwt from 'jsonwebtoken';
import errorMiddleware from './middlewares/errorMiddleware.js';
import accessTokenMiddleware from './middlewares/accessTokenMiddleware.js';
import boardValidationMiddleware from './middlewares/boardValidationMiddleware.js';
import cardValidationMiddleware from './middlewares/cardValidationMiddleware.js';
import { ADMIN } from './roles/roles.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());

app.use('/api/card', accessTokenMiddleware, cardValidationMiddleware, cardRouter);
app.use('/api/board', accessTokenMiddleware, boardValidationMiddleware, boardRouter);

app.use(errorMiddleware);

app.listen(process.env.PORT, () =>
  console.log(`Server has been started on port ${process.env.PORT} ...`)
);

//generateAccessToken();
function generateAccessToken() {
  const accessToken = jwt.sign({ roles: [ADMIN] }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.TIME_JWT_ACCESS,
  });

  console.log(accessToken);
}
