const Pile = require('./model/pile/Pile');
const Card = require('./model/card/Card');
const CardConstants = require('./model/card/CardConstants');
const Deck = require('./model/deck/Deck');

const pile = new Pile();
const ace = new Card(CardConstants.Number.ACE, CardConstants.Suit.SPADES);
const two = new Card(CardConstants.Number.TWO, CardConstants.Suit.DIAMONDS);
const king = new Card(CardConstants.Number.KING, CardConstants.Suit.HEARTS);

pile.add(ace);
pile.add(two);
pile.add(king);

console.log(pile.sumPile());

const deck = new Deck();

console.log(deck);
