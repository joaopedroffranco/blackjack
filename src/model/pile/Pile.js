/* @flow */
const Card = require('../card/Card');
const CardConstants = require('../card/CardConstants');

class Pile {
    cards: Card[];

	constructor() {
		this.cards = [];
	}

	add(card: Card): void {
		this.cards.push(card);
	}

	hasAce(): boolean {
		return !!this.cards.find((card) => {
			return card.number === CardConstants.Number.ACE;
		});
	}

    usableAce(): boolean {
		return this.hasAce() && this.sum() + 10 <= 21;
	}

	sum(): number {
		let sum = 0;
		this.cards.forEach((card) => {
			sum += card.value();
		});
		return sum;
	}

    sumPile(): number {
        return this.usableAce() ? this.sum() + 10 : this.sum();
    }
};

module.exports = Pile;