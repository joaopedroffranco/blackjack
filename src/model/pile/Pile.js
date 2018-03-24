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
		return this.hasAce() && this.sumPile() + 10 <= 21;
	}

	sumPile(): number {
		let sum = 0;
		this.cards.forEach((card) => {
			sum += card.value();
		});
		return sum;
	}

    sum(): number {
        return this.usableAce() ? this.sumPile() + 10 : this.sumPile();
	}
	
	toString() {
		let string = '{';
		this.cards.forEach((card) => {
			string = string.concat(` ${card.toString()} `);
		});
		string = string.concat('}');
		string = string.concat(` | ${this.sum()}`);
		return string
	}
};

module.exports = Pile;