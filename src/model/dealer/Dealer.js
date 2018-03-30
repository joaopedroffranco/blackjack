/* @flow */
const Card = require('../card/Card');
const CardConstants = require('../card/CardConstants');
const Pile = require('../pile/Pile');

class Dealer {
    cards: Card[];
    discards: Card[];
    shown: Card;
    hidden: Card;

    constructor() {
        this.cards = this.generate();
        this.cards = this.shuffle(this.cards);

        this.discards = [];
    }

    /* actions */
    /* Dealer pega duas cartas, uma virada e outra escondida */
	start() {
		this.shown = this.cards.pop();
        this.hidden = this.cards.pop();
    }

	pick(): Card {
        return this.cards.pop();
    }

    discard() {
        const discarded = this.pick();
        this.discards.push(discarded);
    }

    /* state */
    hasBlackjack() {
        const invisiblePile = new Pile();
        invisiblePile.add(this.shown);
        invisiblePile.add(this.hidden);
        const sum = invisiblePile.sum();
        return sum === 21;
    }

    sum() {
        const invisiblePile = new Pile();
        invisiblePile.add(this.shown);
        invisiblePile.add(this.hidden);
        const sum = invisiblePile.sum();
        return sum;
    }

	/* util */
    generate(): Card[] {
        const cards = [];
        const cardSuits = [CardConstants.Suit.SPADES, CardConstants.Suit.HEARTS, CardConstants.Suit.CLUBS, CardConstants.Suit.DIAMONDS];
        for (let j = 0; j < 4; j++) {
            const suit = cardSuits[j];
            for (var i = CardConstants.Number.ACE; i <= CardConstants.Number.KING; i++) {
                cards.push(new Card(i, suit));
            }
        }
        return cards;
    }

    shuffle(cards: Card[]): Card[] {
        return cards
        .map(a => [Math.random(), a])
        .sort((a, b) => a[0] - b[0])
        .map(a => a[1]);
    }

    toString() {
		return `Dealer | ${this.hidden.toString()} - ${this.shown.toString()} | ${this.sum()}`
	}
}

module.exports = Dealer;