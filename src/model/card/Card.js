/* @flow */
const CardConstants = require('./CardConstants');

class Card {
    number: CardConstants.CardNumberType;
    suit: CardConstants.CardSuitType;

    constructor(number: CardConstants.CardNumberType, suit: CardConstants.CardSuitType) {
        this.number = number;
        this.suit = suit;
    }

    value(): number {
        return CardConstants.Values[this.number];
    }
};

module.exports = Card;