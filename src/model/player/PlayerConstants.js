/* flow */
const State = {
    WAITING: 'Waiting',
    PLAYING: 'Playing',
    STOOD: 'Stood',
    BUST: 'Bust',
    BLACKJACK: 'BlackJack',
    WINNER: 'Winner',
    LOSER: 'Loser'
}

const Action = {
    HIT: 'Hit',
    STAND: 'Stand', 
    REGISTER: 'Register',
    UPDATEME: 'Update Me'
}

type PlayerStateType = 'Waiting' | 'Playing' | 'Stood' | 'Bust' | 'BlackJack'| 'Winner' | 'Loser';
type ActionType = 'Hit' | 'Stand' | 'Register';

module.exports = {
    State,
    Action
}