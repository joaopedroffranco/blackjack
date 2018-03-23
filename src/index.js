const Pile = require('./model/pile/Pile');
const Card = require('./model/card/Card');
const CardType = require('./model/card/CardType');

const pile = new Pile();
const ace = new Card(CardType.Number.ACE, CardType.Suit.SPADES);
const two = new Card(CardType.Number.TWO, CardType.Suit.DIAMONDS);
const king = new Card(CardType.Number.KING, CardType.Suit.HEARTS);

pile.add(ace);
pile.add(two);
pile.add(king);

console.log(pile.sumPile());
