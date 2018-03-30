/* flow */
const State = {
    RUNNING: 'Running',
    STOPPED: 'Stopped',
}

const Winner = {
    PLAYER: 'Player',
    DEALER: 'Dealer'
}

type GameStateType = 'Running' | 'Stopped';
type WinnerType = 'Player' | 'Dealer';

module.exports = {
    State,
    Winner
}