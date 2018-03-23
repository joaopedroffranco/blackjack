/* @flow */
const CardType = require('./CardType');

class Card {
    number: CardType.CardNumber;
    suit: CardType.CardSuit;

    constructor(number: CardType.CardNumber, suit: CardType.CardSuit) {
        this.number = number;
        this.suit = suit;
    }

    value(): number {
        return CardType.Values[this.number];
    }
};

module.exports = Card;