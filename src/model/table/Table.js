/* @flow */
const Player = require('../player/Player');
const Dealer = require('../dealer/Dealer');
const Game = require('../game/Game');

class Table {
    players: Player[];
	dealer: Dealer;

	constructor(players: Player[]) {
		this.players = players;

		const dealer = new Dealer();
		this.dealer = dealer;
	}

	start() {
		console.log('------ START TABLE ------');
		this.players.forEach((player) => {
            const game = new Game(player, this.dealer);
            game.start();
            console.log('\n');
        });
        console.log('------ END TABLE ------');
	}
}

module.exports = Table;