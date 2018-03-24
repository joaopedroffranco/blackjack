/* @flow */
const PlayerConstants = require('./PlayerConstants');
const Pile = require('../pile/Pile');
const Card = require('../card/Card');
const Dealer = require('../dealer/Dealer');

class Player {
    id: number;
	name: string;
	pile: Pile;
    state: PlayerConstants.PlayerStateType;
    
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.pile = new Pile();
        this.state = PlayerConstants.State.PLAYING;
	}

	getInitialCardsWith(dealer: Dealer) {
		const picked1 = dealer.pick();
		const picked2 = dealer.pick();
		this.get(picked1);
		this.get(picked2);
		console.log(`start with: ${this.pile.toString()}`)
	}

	get(card: Card) {
		this.pile.add(card);
	}

    hit(dealer: Dealer) {
		this.state = PlayerConstants.State.PLAYING;
		this.get(dealer.pick());
		console.log(`hit: ${this.pile.toString()}`)

		const currentSum = this.pile.sum();
		if (currentSum === 21) this.blackjack();
		if (currentSum > 21) this.bust();
    }

    stand() {
		console.log(`stand!`)
		this.state = PlayerConstants.State.STOOD;
    }

    bust() {
		console.log(`bust! :(`)
		this.state = PlayerConstants.State.BUST;
    }

    waiting() {
        this.state = PlayerConstants.State.WAITING;
	}

	blackjack() {
		console.log(`blackjack!! :)`)
		this.state = PlayerConstants.State.BLACKJACK;
	}

	isPlaying(): boolean {
		return this.state === PlayerConstants.State.PLAYING;
	}
	
	toString() {
		return `${this.name} | ${this.pile.toString()}`
	}
}

module.exports = Player;