/* @flow */
const Player = require('../player/Player');
const Dealer = require('../dealer/Dealer');
const Game = require('../game/Game');

class Table {
    games: Game[];
	dealer: Dealer;

	constructor(players: Player[]) {
		this.games = [];
		this.dealer = new Dealer();
		players.forEach((player) => {
            const game = new Game(player, this.dealer);
            this.games.push(game);
        });

	}

	start() {
		console.log('------ START TABLE ------');
		this.dealer.start();
		this.games.forEach((game) => {
            game.start();
            console.log('\n');
        });
        console.log('------ END TABLE ------');
	}
}

module.exports = Table;