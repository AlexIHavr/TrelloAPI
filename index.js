import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import userRouter from './routers/userRouter.js';
import adminRouter from './routers/adminRouter.js';
import jwt from 'jsonwebtoken';
import errorMiddleware from './middlewares/errorMiddleware.js';
import accessTokenMiddleware from './middlewares/accessTokenMiddleware.js';
import boardValidationMiddleware from './middlewares/boardValidationMiddleware.js';
import cardValidationMiddleware from './middlewares/cardValidationMiddleware.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());

app.use('/api/user', cardValidationMiddleware, userRouter);
app.use('/api/admin', accessTokenMiddleware, boardValidationMiddleware, adminRouter);

app.use(errorMiddleware);

app.listen(process.env.PORT, () =>
  console.log(`Server has been started on port ${process.env.PORT} ...`)
);

//generateAccessToken();
function generateAccessToken() {
  const accessToken = jwt.sign({}, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.TIME_JWT_ACCESS,
  });

  console.log(accessToken);
}
