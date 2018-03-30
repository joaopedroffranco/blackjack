/* @flow */
const Table = require('../model/table/Table');
const TableConstants = require('../model/table/TableConstants');
const Player = require('../model/player/Player');
const Dealer = require('../model/dealer/Dealer');
const Card = require('../model/card/Card');
const Game = require('../model/game/Game');

class GameFormatter {

    tableToJson(table: Table) {
        return JSON.stringify(this.formatTable(table))
    }

    formatTable(table: Table) {
        const showHidden = table.state === TableConstants.State.FINISHED;

        return {
            state: table.state,
            currentPlayer: table.games[table.currentGame].player.name,
            players: this.formatPlayers(this.extractPlayers(table.games)),
            dealer: this.formatDealer(table.dealer, showHidden)
        }
    }
    
    formatPlayers(players: Player[]) {
        const formattedPlayers = [];
        players.forEach((player) => {
            formattedPlayers.push(this.formatPlayer(player));
        });

        return formattedPlayers;
    }

    formatPlayer(player: Player) {
        return {
            pile: this.formatCards(player.pile.cards),
            state: player.state
        }
    }
    
    formatDealer(dealer: Dealer, showHidden: boolean) {
        if (showHidden) {
            return {
                shown: this.formatCard(dealer.shown),
                hidden: this.formatCard(dealer.hidden)
            }
        } else {
            return {
                shown: this.formatCard(dealer.shown),
            }
        }
    }

    formatCards(cards: Card[]) {
        const formattedCards = [];
        cards.forEach((card) => {
            formattedCards.push(this.formatCard(card));
        });

        return formattedCards;
    }
    
    formatCard(card: Card) {
        return {
            suit: card.suit,
            number: card.number
        }
    }

    extractPlayers(games: Game[]) {
        const players = [];
        games.forEach((game) => {
            players.push(game.player);
        });

        return players;
    }
}

module.exports = GameFormatter;
