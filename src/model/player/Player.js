/* @flow */
const PlayerConstants = require('./PlayerConstants');
const Pile = require('../pile/Pile');

class Player {
    id: number;
	name: string;
	pile: Pile;
    state: PlayerConstants.PlayerStateType;
    
    constructor(id: number, name: string, pile: Pile) {
        this.id = id;
        this.name = name;
        this.pile = pile;
        this.state = PlayerConstants.State.WAITING;
    }

    hit() {
        this.state = PlayerConstants.State.PLAYING;
    }

    stand() {
        this.state = PlayerConstants.State.STOOD;
    }

    bust() {
        this.state = PlayerConstants.State.BUST;
    }
}

module.exports = Player;