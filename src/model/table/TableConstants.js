/* flow */
const State = {
    REGISTERING: 'Registering',
    PLAYING: 'Playing',
    FINISHED: 'Finished'
}

type StateType = 'Idle' | 'Registering' | 'Playing' | 'Finished';

module.exports = {
    State
}