import { Router } from 'express';
import manageItemsService from '../services/manageItemsService.js';

const userRouter = Router();
const cardsDB = manageItemsService.cardsDB;

userRouter.post('/createCard', (req, res) => {
  manageItemsService.createCard(req.body);
  res.json({ code: 200, status: 'OK' });
});

userRouter.get('/getCard', (req, res) => {
  const board = manageItemsService.getItem(cardsDB, req.body.id);
  res.json(board);
});
userRouter.get('/getAllCards', (req, res) => {
  const boards = manageItemsService.getAllItems(cardsDB);
  res.json(boards);
});

userRouter.put('/changeCard', (req, res) => {
  manageItemsService.changeItem(cardsDB, req.body);
  res.json({ code: 200, status: 'OK' });
});

userRouter.delete('/deleteCard', (req, res) => {
  manageItemsService.deleteItem(cardsDB, req.body.id);
  res.json({ code: 200, status: 'OK' });
});

export default userRouter;
