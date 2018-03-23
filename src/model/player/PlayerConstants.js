/* flow */
const State = {
    WAITING: 'Waiting',
    PLAYING: 'Playing',
    STOOD: 'Stood',
    BUST: 'Bust'
}

type PlayerStateType = 'Waiting' | 'Playing' | 'Stood' | 'Bust';

module.exports = {
    State
}