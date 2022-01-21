import { Router } from 'express';
import cardController from '../controllers/cardController.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import cardValidationSchema from '../schemas/cardValidationSchema.js';

const cardRouter = Router();

cardRouter.post(
  '/addCard',
  validationMiddleware(cardValidationSchema.requiredBoardIdSchema),
  cardController.addCard
);

cardRouter.get(
  '/getCard',
  validationMiddleware(cardValidationSchema.requiredIdSchema),
  cardController.getCard
);
cardRouter.get(
  '/getCards',
  validationMiddleware(cardValidationSchema.notRequiredIdSchema),
  cardController.getCards
);

cardRouter.put(
  '/changeCard',
  validationMiddleware(cardValidationSchema.requiredIdSchema),
  cardController.changeCard
);

cardRouter.delete(
  '/deleteCard',
  validationMiddleware(cardValidationSchema.requiredIdSchema),
  cardController.deleteCard
);

export default cardRouter;
