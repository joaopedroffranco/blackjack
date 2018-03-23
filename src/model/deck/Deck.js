/* @flow */
const Card = require("../card/Card");
const CardType = require("../card/CardType");

class Deck {

    cards: Card[];

    constructor() {
        this.cards = [];

        const cardSuits = [CardType.Suit.SPADES, CardType.Suit.HEARTS, CardType.Suit.CLUBS, CardType.Suit.DIAMONDS];
        for (var j = 0; j < 4; j++) {
            const suit = cardSuits[j];
            for (var i = CardType.Number.ACE; i <= CardType.Number.KING; i++) {
                this.cards.push(new Card(i, suit));
            }
        }
    }
}

module.exports = Deck;