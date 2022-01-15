import { Router } from 'express';
import manageItemsService from '../services/manageItemsService.js';

const adminRouter = Router();
const boardsDB = manageItemsService.boardsDB;

adminRouter.post('/createBoard', (req, res) => {
  manageItemsService.createBoard(req.body);
  res.json({ code: 200, status: 'OK' });
});

adminRouter.get('/getBoard', (req, res) => {
  const board = manageItemsService.getItem(boardsDB, req.body.id);
  res.json(board);
});
adminRouter.get('/getAllBoard', (req, res) => {
  const boards = manageItemsService.getAllItems(boardsDB);
  res.json(boards);
});

adminRouter.put('/changeBoard', (req, res) => {
  manageItemsService.changeItem(boardsDB, req.body);
  res.json({ code: 200, status: 'OK' });
});

adminRouter.delete('/deleteBoard', (req, res) => {
  manageItemsService.deleteItem(boardsDB, req.body.id);
  res.json({ code: 200, status: 'OK' });
});

export default adminRouter;
