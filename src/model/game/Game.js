/* @flow */
const Player = require('../player/Player');
const Dealer = require('../dealer/Dealer');

class Game {
    player: Player;
	dealer: Dealer;
	winner: Player | Dealer;

	constructor(player: Player, dealer: Dealer) {
		this.player = player;
		this.dealer = dealer;
	}

	start() {
		console.log(`------ START GAME ${this.player.name.toUpperCase()} ------`);

		/* e da duas cartas para o jogador */
		this.player.getInitialCardsWith(this.dealer);

		/* se o dealer já tem blackjack, ganhou, se não, o jogador joga */
		if (this.dealer.hasBlackjack()) {
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
		const dealerSum = this.dealer.sum();
		const playerIsWinner = playerSum <= 21 && playerSum > dealerSum;
		return playerIsWinner ? this.player : this.dealer;
	}

	setWinner(winner: Player | Dealer) {
		this.winner = winner;
		this.finish();
	}
}

module.exports = Game;