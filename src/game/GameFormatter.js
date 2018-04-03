/* @flow */
const Table = require('../model/table/Table');
const TableConstants = require('../model/table/TableConstants');
const Player = require('../model/player/Player');
const Dealer = require('../model/dealer/Dealer');
const Card = require('../model/card/Card');
const Game = require('../model/game/Game');

class GameFormatter {
    /* Table */
    static tableToJson(table: Table) {
        return JSON.stringify(this.formatTable(table))
    }

    static formatTable(table: Table) {
        if (table.state === TableConstants.State.REGISTERING) {
            return this.formatRegisteringTable(table);
        } else {
            return this.formatPlayingTable(table);
        }
    }

    static formatRegisteringTable(table: Table) {
        return {
            state: table.state,
            type: 'Table'
        }
    }

    static formatPlayingTable(table: Table) {
        const showHidden = table.state === TableConstants.State.FINISHED;

        return {
            state: table.state,
            currentPlayer: table.games[table.currentGame].player.name,
            players: this.formatPlayers(this.extractPlayers(table.games)),
            dealer: this.formatDealer(table.dealer, showHidden),
            type: 'Table'
        }
    }
    
    static formatPlayers(players: Player[]) {
        const formattedPlayers = [];
        players.forEach((player) => {
            formattedPlayers.push(this.formatPlayer(player));
        });

        return formattedPlayers;
    }

    static formatPlayer(player: Player) {
        return {
            name: player.name,
            pile: this.formatCards(player.pile.cards),
            state: player.state
        }
    }
    
    static formatDealer(dealer: Dealer, showHidden: boolean) {
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

    static formatCards(cards: Card[]) {
        const formattedCards = [];
        cards.forEach((card) => {
            formattedCards.push(this.formatCard(card));
        });

        return formattedCards;
    }
    
    static formatCard(card: Card) {
        return {
            suit: card.suit,
            number: card.number
        }
    }

    static extractPlayers(games: Game[]) {
        const players = [];
        games.forEach((game) => {
            players.push(game.player);
        });

        return players;
    }

    /* JSON Response */
    static toJson(success: boolean, message: string) {
        const json = {
            success: success,
            message: message,
            type: 'Response'
        };
        return JSON.stringify(json);
    }

    static parse(data: any): any {
		try {
			return JSON.parse(data.toString());
		} catch (e) {
			return false;
		}
	}
}

module.exports = GameFormatter;
