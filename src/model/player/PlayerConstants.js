/* flow */
const State = {
    WAITING: 'Waiting',
    PLAYING: 'Playing',
    STOOD: 'Stood',
    BUST: 'Bust',
    BLACKJACK: 'Blackjack'
}

type PlayerStateType = 'Waiting' | 'Playing' | 'Stood' | 'Bust' | 'Blackjack';

module.exports = {
    State
}