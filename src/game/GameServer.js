/* @flow */
const net = require('net');
const Table = require('../model/table/Table');
const GameConnection = require('./GameConnection');
 
class GameServer {
	connections: GameConnection[];

	constructor() {
		this.connections = [];
		const table = new Table(1, this);

		const server = net.createServer((connection) => { 
			console.log('A player entered');
			this.connections.push(new GameConnection(connection, table));
		 });

		 server.listen('3000', () => { 
			console.log('Dealer is waiting for players...');
		 });
	}

	updatePlayers() {
		this.connections.forEach((connection) => {
			connection.sendTableState();
		})
	}

}

module.exports = GameServer;