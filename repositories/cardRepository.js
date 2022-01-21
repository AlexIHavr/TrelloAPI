import ApiError from '../errors/ApiError.js';
import BaseRepository from './BaseRepository.js';
import boardRepository from './boardRepository.js';

class CardRepository extends BaseRepository {
  constructor() {
    super('cards.json');
  }

  addCard({ boardId, name, description, estimate, status, dueDate, labels }) {
    if (!boardRepository.getBoard(boardId)) {
      throw ApiError.BadRequest('Board with this card does not exist. Check out board id.');
    }

    return super.addItem({
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

  getAllCards() {
    return super.getAllItems();
  }

  getCardsByFilter(filterFields) {
    return super.getItemsByFilter(filterFields);
  }

  getCard(idItem) {
    return super.getItem(idItem);
  }

  changeCard(data) {
    return super.changeItem(data);
  }

  deleteCard(id) {
    return super.deleteItem(id);
  }
}

export default new CardRepository();
