/* @flow */
const PlayerConstants = require('../player/PlayerConstants');
const GameConstants = require('./GameConstants');
const Player = require('../player/Player');
const Dealer = require('../dealer/Dealer');

class Game {
    player: Player;
	dealer: Dealer;
	winner: GameConstants.WinnerType;

	constructor(player: Player, dealer: Dealer) {
		this.player = player;
		this.dealer = dealer;
	}

	start() {
		console.log(`------ START GAME ${this.player.name.toUpperCase()} ------`);

		/* e da duas cartas para o jogador */
		this.player.getInitialCardsWith(this.dealer);

		/* se o dealer já tem blackjack, ganhou, se não, o jogador joga */
		/*if (this.dealer.hasBlackjack()) {
			this.setWinner(this.dealer);
		}*/
	}

	processAction(action: PlayerConstants.ActionType): PlayerConstants.PlayerStateType {
		if (action === PlayerConstants.Action.HIT) {
			this.player.hit();
		} else {
			this.player.stand();
		}
		return this.player.state;
	}

	finish() {
		const playerSum = this.player.pile.sum();
		const dealerSum = this.dealer.sum();
		const playerIsWinner = playerSum <= 21 && playerSum > dealerSum;
		if (playerIsWinner) {
			this.winner = GameConstants.Winner.PLAYER;
		} else {
			this.winner = GameConstants.Winner.DEALER;
		}
	}
}

module.exports = Game;