/* @flow */
const PlayerConstants = require('./PlayerConstants');
const Pile = require('../pile/Pile');
const Card = require('../card/Card');
const Dealer = require('../dealer/Dealer');

class Player {
	name: string;
	pile: Pile;
    state: PlayerConstants.PlayerStateType;
    
    constructor(name: string) {
        this.name = name;
        this.pile = new Pile();
	}

	getInitialCardsWith(dealer: Dealer) {
		this.get(dealer.pick());
		this.get(dealer.pick());
		console.log(`start with: ${this.pile.toString()}`);
		this.state = PlayerConstants.State.PLAYING;
	}

	get(card: Card) {
		this.pile.add(card);
	}

    hit(dealer: Dealer) {
		this.state = PlayerConstants.State.PLAYING;
		this.get(dealer.pick());
		console.log(`hit: ${this.pile.toString()}`)

		const currentSum = this.pile.sum();
		// if player went blackjack, we will force him to stand. No one should be that dumb to ask for more cards
		if (currentSum == 21) this.stand();
		// if player got more than
		if (currentSum > 21) this.bust();
    }

    stand() {
		console.log(`stand!`)
		this.state = PlayerConstants.State.STOOD;
    }

    bust() {
		console.log(`bust! :(`)
		this.state = PlayerConstants.State.BUST;
		this.lose();
    }

    waiting() {
        this.state = PlayerConstants.State.WAITING;
	}

	isPlaying(): boolean {
		return this.state === PlayerConstants.State.PLAYING;
	}
	
	win() {
		this.state = PlayerConstants.State.WINNER;
	}

	lose() {
		this.state = PlayerConstants.State.LOSER;
	}

	toString() {
		return `${this.name} | ${this.pile.toString()}`
	}
}

module.exports = Player;