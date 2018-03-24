/* flow */
const Suit = {
    SPADES: '♠',
    HEARTS: '♥',
    CLUBS: '♣',
    DIAMONDS: '♦'
}

const Number = {
    ACE: 0,
    TWO: 1,
    THREE: 2,
    FOUR: 3,
    FIVE: 4,
    SIX: 5,
    SEVEN: 6,
    EIGHT: 7,
    NINE: 8,
    TEN: 9,
    JACK: 10,
    QUEEN: 11,
    KING: 12
}
const Values = [1,2,3,4,5,6,7,8,9,10,10,10,10];
const Names = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

type CardSuitType = '♦' | '♠' | '♣' | '♥';
type CardNumberType = 0|1|2|3|4|5|6|7|8|9|10|11|12;

module.exports = {
    Suit,
    Number,
    Values,
    Names
}