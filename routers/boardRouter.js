import { Router } from 'express';
import boardController from '../controllers/boardController.js';
import rolesMiddleware from '../middlewares/rolesMiddleware.js';
import { ADMIN } from '../roles/roles.js';

const boardRouter = Router();

boardRouter.post('/createBoard', rolesMiddleware([ADMIN]), boardController.createBoard);

boardRouter.get('/getBoard', boardController.getBoard);
boardRouter.get('/getAllBoards', boardController.getAllBoards);
boardRouter.get('/getBoards', boardController.getBoards);

boardRouter.put('/changeBoard', rolesMiddleware([ADMIN]), boardController.changeBoard);

boardRouter.delete('/deleteBoard', rolesMiddleware([ADMIN]), boardController.deleteBoard);

export default boardRouter;
