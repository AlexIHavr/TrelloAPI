import { Router } from 'express';
import cardController from '../controllers/cardController.js';

const cardRouter = Router();

cardRouter.post('/createCard', cardController.createCard);

cardRouter.get('/getCard', cardController.getCard);
cardRouter.get('/getAllCards', cardController.getAllCards);
cardRouter.get('/getCards', cardController.getCards);

cardRouter.put('/changeCard', cardController.changeCard);

cardRouter.delete('/deleteCard', cardController.deleteCard);

export default cardRouter;
