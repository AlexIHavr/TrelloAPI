import cardRepository from '../repositories/cardRepository.js';

class CardController {
  addCard(req, res) {
    const newCard = cardRepository.addCard(req.body);
    res.json(newCard);
  }

  getCard(req, res) {
    const card = cardRepository.getCard(req.body.id);
    res.json(card);
  }

  getCards(req, res) {
    const filteredCards = cardRepository.getCardsWithFilter(req.body);
    res.json(filteredCards);
  }

  changeCard(req, res) {
    const changedCard = cardRepository.changeCard(req.body);
    res.json(changedCard);
  }

  deleteCard(req, res) {
    const deletedCard = cardRepository.deleteCard(req.body.id);
    res.json(deletedCard);
  }
}

export default new CardController();
