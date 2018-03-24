const Pile = require('./model/pile/Pile');
const Card = require('./model/card/Card');
const CardConstants = require('./model/card/CardConstants');
const Player = require('./model/player/Player');
const Game = require('./model/game/Game');

/* Player */
const jao = new Player(1, 'Jão');

/* Game */
const game = new Game(jao)
game.start();
