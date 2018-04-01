/* @flow */
const net = require('net');
const Table = require('../model/table/Table');
const GameConnection = require('./GameConnection');
 
class GameServer {
	connections: GameConnection[];

	constructor() {
		this.connections = [];
	}

	start() {
		const table = new Table(1, this);
		const server = net.createServer((connection) => { 
			console.log('New client connection');
			this.connections.push(new GameConnection(connection, table));
		 });

		 server.listen('3000', () => { 
			console.log('Blackjack server has started!');
		 });
	}

	updatePlayers() {
		this.connections.forEach((connection) => {
			connection.sendTableState();
		})
	}

	destroyConnections() {
		this.connections.forEach((connection) => {
			connection.close();
		});
		this.connections = []
	}

}

module.exports = GameServer;