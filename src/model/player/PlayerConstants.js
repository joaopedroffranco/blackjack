/* flow */
const State = {
    WAITING: 'Waiting',
    PLAYING: 'Playing',
    STOOD: 'Stood',
    BUST: 'Bust',
    BLACKJACK: 'Blackjack'
}

const Action = {
    HIT: 'Hit',
    STAND: 'Stand', 
    REGISTER: 'Register',
    UPDATEME: 'Update Me'
}

type PlayerStateType = 'Waiting' | 'Playing' | 'Stood' | 'Bust' | 'Blackjack';
type ActionType = 'Hit' | 'Stand' | 'Register';

module.exports = {
    State,
    Action
}