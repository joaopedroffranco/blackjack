/* @flow */
const TableConstants = require('./TableConstants');
const PlayerConstants = require('../player/PlayerConstants');
const Player = require('../player/Player');
const Dealer = require('../dealer/Dealer');
const Game = require('../game/Game');
const GameServer = require('../../server/GameServer');

class Table {
	state: TableConstants.StateType;
	currentGame: number;  
	numberOfPlayers: number;
    games: Game[];
	dealer: Dealer;
	gameServer: GameServer;

	constructor(numberOfPlayers: number, gameServer: GameServer) {
		this.gameServer = gameServer;
		this.games = [];
		this.numberOfPlayers = numberOfPlayers;
		this.initializeTable(true);
	}

	initializeTable(refreshDealerDeck: boolean) {
		console.log(`Dealer is waiting for players. Need ${this.numberOfPlayers}`);
		if (refreshDealerDeck) {
			this.dealer = new Dealer();
		}
		this.state = TableConstants.State.REGISTERING;
		this.currentGame = 0;
	}

	register(playerName: string, callback: (success: boolean, message: string) => void) {
		if (this.state === TableConstants.State.REGISTERING) {
			console.log(`REGISTERING PLAYER: ${playerName}`);
			const player = new Player(playerName);
			const game = new Game(player, this.dealer);
			this.games.push(game);

			callback(true, 'Registered');

			if (this.games.length === this.numberOfPlayers) {
				console.log('Finished Registering all Players');
				this.distributeCards();
			} else {
				// informing all players of the current state
				this.gameServer.updatePlayers();
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
		this.games.forEach((game) => {
			game.start();
		});
		console.log('---- THE DEALER HAS DISTRIBUTED THE CARDS -----');
		console.log(`DEALER'S CARDS: ${this.dealer.toString()}`);
		
		this.gameServer.updatePlayers();
	}

	processAction(playerName: string, action: PlayerConstants.PlayerStateType, callback: (success: boolean, message: string) => void) {
		if (this.state === TableConstants.State.PLAYING) {
			if (playerName === this.games[this.currentGame].player.name) {
				const game = this.games[this.currentGame];
				const playerState = game.processAction(action);

				this.gameServer.updatePlayers();
				if (playerState !== PlayerConstants.State.PLAYING) {
					this.changePlayer();
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
		if (this.currentGame === this.games.length - 1) {
			this.finishGame();
		} else {
			this.currentGame++;
			this.gameServer.updatePlayers();
		}
	}

	finishGame() {
		console.log('---- GAME HAS ENDED. NEW GAME WILL START ----')
		this.games.forEach((game) => {
			game.finish();
		});
		this.state = TableConstants.State.FINISHED;
		this.gameServer.updatePlayers();
		this.gameServer.destroyConnections();

		this.games = [];

		this.initializeTable(this.dealer.deckCount() <= 50);
	}
}

module.exports = Table;