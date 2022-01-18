import { Router } from 'express';
import cardController from '../controllers/cardController.js';
import cardValidationMiddleware from '../middlewares/cardValidationMiddleware.js';
import cardValidationRepository from '../repositories/cardValidationRepository.js';

const cardRouter = Router();

cardRouter.post(
  '/addCard',
  cardValidationMiddleware(cardValidationRepository.requiredBoardIdSchema),
  cardController.addCard
);

cardRouter.get(
  '/getCard',
  cardValidationMiddleware(cardValidationRepository.requiredIdSchema),
  cardController.getCard
);
cardRouter.get(
  '/getCards',
  cardValidationMiddleware(cardValidationRepository.notRequiredIdSchema),
  cardController.getCards
);

cardRouter.put(
  '/changeCard',
  cardValidationMiddleware(cardValidationRepository.requiredIdSchema),
  cardController.changeCard
);

cardRouter.delete(
  '/deleteCard',
  cardValidationMiddleware(cardValidationRepository.requiredIdSchema),
  cardController.deleteCard
);

export default cardRouter;
