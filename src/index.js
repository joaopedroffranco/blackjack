const Player = require('./model/player/Player');
const Table = require('./model/table/Table');
const GameServer = require('./game/GameServer');

// /* Player */
// const jao = new Player(1, 'Jão');
// const kiq = new Player(2, 'Kiq');

// const elements = [0, 1, 2, 3, 4];
// let players = [];
// elements.forEach((element) => {
//     players.push(new Player(element, `Jogador ${element+1}`));
// })

// /* Table */
// const table = new Table(players);
// table.start();

const server = new GameServer();

