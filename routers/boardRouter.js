import { Router } from 'express';
import boardController from '../controllers/boardController.js';
import boardValidationMiddleware from '../middlewares/boardValidationMiddleware.js';
import rolesMiddleware from '../middlewares/rolesMiddleware.js';
import boardValidationRepository from '../repositories/boardValidationRepository.js';
import { ADMIN } from '../roles/roles.js';

const boardRouter = Router();

boardRouter.post(
  '/addBoard',
  boardValidationMiddleware(boardValidationRepository.notRequiredIdSchema),
  rolesMiddleware([ADMIN]),
  boardController.addBoard
);

boardRouter.get(
  '/getBoard',
  boardValidationMiddleware(boardValidationRepository.requiredIdSchema),
  boardController.getBoard
);
boardRouter.get(
  '/getBoards',
  boardValidationMiddleware(boardValidationRepository.notRequiredIdSchema),
  boardController.getBoards
);

boardRouter.put(
  '/changeBoard',
  boardValidationMiddleware(boardValidationRepository.requiredIdSchema),
  rolesMiddleware([ADMIN]),
  boardController.changeBoard
);

boardRouter.delete(
  '/deleteBoard',
  boardValidationMiddleware(boardValidationRepository.requiredIdSchema),
  rolesMiddleware([ADMIN]),
  boardController.deleteBoard
);

export default boardRouter;
