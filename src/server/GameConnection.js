const net = require('net');
const Table = require('../model/table/Table');
const PlayerConstants = require('../model/player/PlayerConstants');
const GameFormatter = require('./GameFormatter');

class GameConnection {
	connection;
	table: Table;
	playerName: string;

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
		const json = GameFormatter.parse(data);
		if (json) {
			const action = json.action;
			this.process(action, json);
		}
	}

	process(action: PlayerConstants.ActionType, json: JSON) {
		switch (action) {
		case PlayerConstants.Action.REGISTER:
			this.playerName = json.player.name || 'Jogador';
			this.table.register(this.playerName, (success, message) => {
				this.sendMessage(GameFormatter.toJson(success, message));
			});
			break;
		case PlayerConstants.Action.HIT:
			this.table.processAction(this.playerName, action, (success, message) => {
				this.sendMessage(GameFormatter.toJson(success, message));
			});
			break;
		case PlayerConstants.Action.STAND:
			this.table.processAction(this.playerName, action, (success, message) => {
				this.sendMessage(GameFormatter.toJson(success, message));
			});
			break;
			case PlayerConstants.Action.UPDATEME:
				this.sendTableState()
			break;
		default: break;
		}
	}

	sendMessage(jsonMessage, connection) {
		this.connection.write(Buffer.byteLength(jsonMessage, 'utf8') + '#');
		this.connection.write(jsonMessage);
	}

	sendTableState() {
		this.sendMessage(GameFormatter.tableToJson(this.table));
	}

	close() {
		this.connection.destroy();
	}
}

module.exports = GameConnection;