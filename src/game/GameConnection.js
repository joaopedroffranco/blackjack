const net = require('net');
 
class GameConnection {
    connection;

	constructor(connection) {
        this.connection = connection;
	
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
			this.connection.write(`action: ${action}`);
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

	process(action) {

	}

}

module.exports = GameConnection;