/* @flow */
const net = require('net');
const Table = require('../model/table/Table');
const GameConnection = require('./GameConnection');
 
class GameServer {
	connections: GameConnection[];
	table: Table;

	constructor() {
		this.connections = [];
		this.table = new Table();

		const server = net.createServer((connection) => { 
			console.log('A player entered');
			this.connections.push(new GameConnection(connection));
		 });

		 server.listen(3000, () => { 
			console.log('Dealer is waiting for players...');
		 });
	}

	sendTable() {
		this.connections.forEach((connection) => {
			connection.write(this.table);
		})
	}

}

module.exports = GameServer;