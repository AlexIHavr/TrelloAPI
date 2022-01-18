import ApiError from '../errors/ApiError.js';
import { boardsDoc, cardsDoc } from '../models/models.js';
import trelloDB from '../repositories/trelloDB.js';

class BoardController {
  createBoard(req, res) {
    const { name, color, description } = req.body;

    const newBoard = trelloDB.addItem(boardsDoc, {
      name: name ?? 'Default board',
      color: color ?? 'white',
      description: description ?? '',
      createdAt: new Date().toLocaleString(),
    });

    res.json(newBoard);
  }

  getBoard(req, res) {
    const board = trelloDB.getItem(boardsDoc, req.body.id);

    if (!board) {
      throw ApiError.BadRequest('Board with this id does not exist.');
    }

    res.json(board);
  }

  getBoards(req, res) {
    const filteredBoards = trelloDB.getItemsWithFilter(boardsDoc, req.body);
    res.json(filteredBoards);
  }

  getAllBoards(req, res) {
    const allBoards = trelloDB.getAllItems(boardsDoc);
    res.json(allBoards);
  }

  changeBoard(req, res) {
    const changedBoard = trelloDB.changeItem(boardsDoc, req.body);
    res.json(changedBoard);
  }

  deleteBoard(req, res) {
    const deletedBoard = trelloDB.deleteItem(boardsDoc, req.body.id);

    trelloDB.getItemsWithFilter(cardsDoc, { boardId: req.body.id }).forEach((item) => {
      trelloDB.deleteItem(cardsDoc, item.id);
    });

    res.json(deletedBoard);
  }
}

export default new BoardController();
