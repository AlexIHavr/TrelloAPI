import boardRepository from '../repositories/boardRepository.js';

class BoardController {
  addBoard(req, res) {
    const newBoard = boardRepository.addBoard(req.body);
    res.json(newBoard);
  }

  getBoard(req, res) {
    const board = boardRepository.getItem(req.body.id);
    res.json(board);
  }

  getBoards(req, res) {
    const filteredBoards = boardRepository.getBoardsWithFilter(req.body);
    res.json(filteredBoards);
  }

  changeBoard(req, res) {
    const changedBoard = boardRepository.changeBoard(req.body);
    res.json(changedBoard);
  }

  deleteBoard(req, res) {
    const deletedBoard = boardRepository.deleteBoard(req.body.id);
    res.json(deletedBoard);
  }
}

export default new BoardController();
