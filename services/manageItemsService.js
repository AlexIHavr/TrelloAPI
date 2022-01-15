import ApiError from '../errors/ApiError.js';
import dataBaseService from './dataBaseService.js';

class ManageItemsService {
  constructor() {
    this.boardsDB = 'boards.json';
    this.cardsDB = 'cards.json';
  }
  createCard({ boardId, name, description, estimate, status, dueDate, labels }) {
    if (!boardId) {
      throw ApiError.BadRequest('Enter board id.');
    }

    if (!dataBaseService.getItemDB(this.boardsDB, boardId)) {
      throw ApiError.BadRequest('Board with this board id does not exist.');
    }

    dataBaseService.addItemDB(this.cardsDB, {
      boardId,
      name: name ?? 'Default card',
      description: description ?? '',
      estimate: estimate ?? '',
      status: status ?? '',
      dueDate: dueDate ?? '',
      labels: labels ?? [],
      createdAt: new Date().toLocaleString(),
    });
  }

  createBoard({ name, color, description }) {
    dataBaseService.addItemDB(this.boardsDB, {
      name: name ?? 'Default board',
      color: color ?? 'white',
      description: description ?? '',
      createdAt: new Date().toLocaleString(),
    });
  }

  getItem(dbName, id) {
    if (!id) {
      throw ApiError.BadRequest('Enter item id.');
    }

    const board = dataBaseService.getItemDB(dbName, id);

    if (!board) {
      throw ApiError.BadRequest('Item with this id does not exist.');
    }

    return board;
  }

  getAllItems(dbName) {
    return dataBaseService.getAllDB(dbName);
  }

  changeItem(dbName, data) {
    if (data.boardId && !dataBaseService.getItemDB(dbName, data.boardId)) {
      throw ApiError.BadRequest('Board with this board id does not exist.');
    }

    dataBaseService.changeItemDB(dbName, data);
  }

  deleteItem(dbName, id) {
    dataBaseService.deleteItemDB(dbName, id);
  }
}

export default new ManageItemsService();
