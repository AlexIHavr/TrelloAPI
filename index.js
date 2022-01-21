import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import errorMiddleware from './middlewares/errorMiddleware.js';
import { ADMIN } from './roles/roles.js';
import baseRouter from './routers/baseRouter.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());

app.use(baseRouter);

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
