const net = require('net');
const Table = require('../model/table/Table');
const PlayerConstants = require('../model/player/PlayerConstants');
const GameFormatter = require('./GameFormatter');

class GameConnection {
	connection;
	table: Table

	constructor(connection, table: Table) {
		this.connection = connection;
		this.table = table;
	
        this.connection.on('end', () => {
            console.log('client disconnected');
        });

        this.connection.on('data', (data) => {
            this.route(data);
        });
	}
	
	route(data) {
		const json = this.parse(data);
		if (json) {
			const action = json.action;
			this.process(action, json);
		}
	}

	parse(data): any {
		try {
			return JSON.parse(data.toString());
		} catch (e) {
			return false;
		}

		return false;
	}

	process(action: PlayerConstants.ActionType, json: JSON) {
		switch (action) {
		case PlayerConstants.Action.REGISTER:
			const playerName = json.player.name || 'Jogador';
			this.table.register(playerName, (success, message) => {
				this.connection.write(`Player ${playerName} ${message}`);
			});
			break;
		case PlayerConstants.Action.REGISTER:
			const playerName = json.player.name || 'Jogador';
			this.table.register(playerName, (success, message) => {
				this.connection.write(`Player ${playerName} ${message}`);
			});
			break;
		case PlayerConstants.Action.REGISTER:
			const playerName = json.player.name || 'Jogador';
			this.table.register(playerName, (success, message) => {
				this.connection.write(`Player ${playerName} ${message}`);
			});
			break;
		default: break;
		}
	}

	sendTableState() {
		this.connection.write(GameFormatter.tableToJson(this.table));
	}
}

module.exports = GameConnection;