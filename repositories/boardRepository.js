import BaseRepository from './BaseRepository.js';
import cardRepository from './cardRepository.js';

class BoardRepository extends BaseRepository {
  constructor() {
    super('boards.json');
  }

  addBoard({ name, color, description }) {
    return super.addItem({
      name: name ?? 'Default board',
      color: color ?? 'white',
      description: description ?? '',
      createdAt: new Date().toLocaleString(),
    });
  }

  getAllBoards() {
    return super.getAllItems();
  }

  getBoardsWithFilter(filterFields) {
    return super.getItemsWithFilter(filterFields);
  }

  getBoard(idItem) {
    return super.getItem(idItem);
  }

  changeBoard(data) {
    return super.changeItem(data);
  }

  deleteBoard(id) {
    cardRepository.getCardsWithFilter({ boardId: id }).forEach((item) => {
      console.log(item);
      cardRepository.deleteItem(item.id);
    });

    return super.deleteItem(id);
  }
}

export default new BoardRepository();
