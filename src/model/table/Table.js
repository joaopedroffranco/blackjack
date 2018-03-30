/* @flow */
const TableConstants = require('./TableConstants');
const PlayerConstants = require('../player/PlayerConstants');
const Player = require('../player/Player');
const Dealer = require('../dealer/Dealer');
const Game = require('../game/Game');

class Table {
	state: TableConstants.StateType;
	currentGame: number;  
	maxNumberOfPlayers: number;
    games: Game[];
	dealer: Dealer;

	constructor(maxNumberOfPlayers: number) {
		this.games = [];
		this.dealer = new Dealer();
		this.maxNumberOfPlayers = maxNumberOfPlayers;
		this.initializeTable();
	}

	initializeTable() {
		this.state = TableConstants.State.REGISTERING;
	}

	register(playerName: String, callback: (success: boolean) => void) {
		if (this.state === TableConstants.State.REGISTERING) {
			console.log(`REGISTERING PLAYER: ${playerName}`);
			const player = new Player(playerName);
			const game = new Game(player, this.dealer);
			games.push(game);

			callback(true, 'Registered');

			if (numberOfPlayers === this.maxNumberOfPlayers) {
				console.log('Finished Registering all Players');
				this.distributeCards();
			}
		} else {
			console.log(`WILL NOT REGISTER PLAYER: ${playerName}. Not registering players right now`);
			callback(false, 'Not registering new players right now');
		}
	}

	distributeCards() {
		console.log('Distributing Cards');
		this.dealer.start();
		this.state = TableConstants.State.PLAYING;
		this.currentGame = 0;
		this.games.forEach((game) => {
			game.start();
		});
		// reportTable
	}

	processAction(playerName: string, action: PlayerStateType, callback: (success: boolean) => void) {
		if (this.state === TableConstants.State.PLAYING) {
			if (playerName === games[this.currentGame].player.name) {
				const game = games[this.currentGame];
				const playerState = game.processAction(action);

				console(true, 'action processed');

				// reportTable

				if (playerState === PlayerConstants.State.STOOD || playerState === PlayerConstants.State.BUST) {
					changePlayer();
				} else {

				}

			} else {
				console.log(`WILL NOT HANDLE ${playerName} action ${action}. Not his/her turn`);
				callback(false, 'Not your turn right now');
			}
		} else {
			console.log(`WILL NOT HANDLE ${playerName} action ${action}. Not playing right now`);
			callback(false, 'Not playing right now');
		}
	}

	changePlayer() {
		this.currentGame++;
	
		if (currentGame == this.games.length) {
			finishGame();
		} else {
			// reportTable
		}
	}

	finishGame() {
		this.games.forEach((game) => {
			game.finishGame();
		});
		this.state = TableConstants.State.FINISHED;
		//reportTable

		this.initializeTable();
	}
}

module.exports = Table;