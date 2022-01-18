import ApiError from '../errors/ApiError.js';
import { cardsDoc } from '../models/models.js';
import trelloDB from '../repositories/trelloDB.js';

class CardController {
  createCard(req, res) {
    const { boardId, name, description, estimate, status, dueDate, labels } = req.body;

    const newCard = trelloDB.addItem(cardsDoc, {
      boardId,
      name: name ?? 'Default card',
      description: description ?? '',
      estimate: estimate ?? '',
      status: status ?? '',
      dueDate: dueDate ?? '',
      labels: labels ?? [],
      createdAt: new Date().toLocaleString(),
    });

    res.json(newCard);
  }

  getCard(req, res) {
    const card = trelloDB.getItem(cardsDoc, req.body.id);

    if (!card) {
      throw ApiError.BadRequest('Card with this id does not exist.');
    }

    res.json(card);
  }

  getCards(req, res) {
    const filteredCards = trelloDB.getItemsWithFilter(cardsDoc, req.body);
    res.json(filteredCards);
  }

  getAllCards(req, res) {
    const allCards = trelloDB.getAllItems(cardsDoc);
    res.json(allCards);
  }

  changeCard(req, res) {
    const changedCard = trelloDB.changeItem(cardsDoc, req.body);
    res.json(changedCard);
  }

  deleteCard(req, res) {
    const deletedCard = trelloDB.deleteItem(cardsDoc, req.body.id);
    res.json(deletedCard);
  }
}

export default new CardController();
