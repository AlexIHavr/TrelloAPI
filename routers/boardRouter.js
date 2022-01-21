import { Router } from 'express';
import boardController from '../controllers/boardController.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import rolesMiddleware from '../middlewares/rolesMiddleware.js';
import { ADMIN } from '../roles/roles.js';
import boardValidationSchema from '../schemas/boardValidationSchema.js';

const boardRouter = Router();

boardRouter.post(
  '/addBoard',
  validationMiddleware(boardValidationSchema.notRequiredIdSchema),
  rolesMiddleware([ADMIN]),
  boardController.addBoard
);

boardRouter.get(
  '/getBoard',
  validationMiddleware(boardValidationSchema.requiredIdSchema),
  boardController.getBoard
);
boardRouter.get(
  '/getBoards',
  validationMiddleware(boardValidationSchema.notRequiredIdSchema),
  boardController.getBoards
);

boardRouter.put(
  '/changeBoard',
  validationMiddleware(boardValidationSchema.requiredIdSchema),
  rolesMiddleware([ADMIN]),
  boardController.changeBoard
);

boardRouter.delete(
  '/deleteBoard',
  validationMiddleware(boardValidationSchema.requiredIdSchema),
  rolesMiddleware([ADMIN]),
  boardController.deleteBoard
);

export default boardRouter;
