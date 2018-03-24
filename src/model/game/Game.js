/* @flow */
const Player = require('../player/Player');
const Dealer = require('../dealer/Dealer');
const GameConstants = require('./GameConstants');

class Game {
    player: Player;
	dealer: Dealer;
	winner: Player | Dealer;
	state: GameConstants.GameStateType;

	constructor(player: Player) {
		this.player = player;

		const dealer = new Dealer();
		this.dealer = dealer;

		this.state = GameConstants.State.RUNNING;
	}

	start() {
		console.log('------ START ------');
		/* Na primeira rodada, dealer pega duas cartas para si */
		this.dealer.start();

		/* e da duas cartas para o jogador */
		this.player.getInitialCardsWith(this.dealer);

		/* se o dealer já tem blackjack, ganhou, se não, o jogador joga */
		if (this.dealer.hasBlackjack()) {
			this.dealer.showHiddenCard();
			this.setWinner(this.dealer);
		} else {
			this.play();
		}
	}

	play() {
		while (this.player.isPlaying()) {
			/* começo de jogo do jogador */
			this.player.hit(this.dealer);

			/* 50% de chance dele parar (falso learning) */
			const shouldStand = this.player.isPlaying() && !!!Math.floor(Math.random() * 2)
			if (shouldStand) this.player.stand();

			/* fim de jogo do jogador */
		}

		this.dealer.showHiddenCard();
		this.setWinner(this.whoWin());
	}

	finish() {
		console.log('------ FINISHED ------');
		console.log(this.player.toString());
		console.log(this.dealer.toString());
		console.log('------ WINNER ------');
		console.log(`VENCEDOR: ${this.winner.toString()}`);
	}

	/* Verifica se quem ganhou foi o jogador ou dealer */
	whoWin() {
		const playerSum = this.player.pile.sum();
		const dealerSum = this.dealer.pile.sum();
		const playerIsWinner = playerSum <= 21 && playerSum > dealerSum;
		return playerIsWinner ? this.player : this.dealer;
	}

	setWinner(winner: Player | Dealer) {
		this.winner = winner;
		this.finish();
	}
}

module.exports = Game;