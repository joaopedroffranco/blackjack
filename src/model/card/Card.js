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

    name(): string {
        return CardConstants.Names[this.number];
    }

    toString() {
        return `${this.name()}${this.suit}`;
    }
};

module.exports = Card;