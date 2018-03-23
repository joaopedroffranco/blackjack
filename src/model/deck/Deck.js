/* @flow */
const Card = require("../card/Card");
const CardConstants = require("../card/CardConstants");

class Deck {
    cards: Card[];

    constructor() {
        this.cards = [];

        const cardSuits = [CardConstants.Suit.SPADES, CardConstants.Suit.HEARTS, CardConstants.Suit.CLUBS, CardConstants.Suit.DIAMONDS];
        for (var j = 0; j < 4; j++) {
            const suit = cardSuits[j];
            for (var i = CardConstants.Number.ACE; i <= CardConstants.Number.KING; i++) {
                this.cards.push(new Card(i, suit));
            }
        }
    }
}

module.exports = Deck;