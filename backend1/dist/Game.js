"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const message_1 = require("./message");
class Game {
    constructor(player1, player2) {
        this.moveCount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: message_1.INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: message_1.INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }
    makeMove(socket, moveToMake) {
        //Doesn't let player1 play when it's not it's turn.
        if (this.moveCount % 2 === 0 && socket !== this.player1) {
            return;
        }
        //Doesn't let player1 play when it's not it's turn.
        if (this.moveCount % 2 === 1 && socket !== this.player2) {
            return;
        }
        try {
            this.board.move(moveToMake);
        }
        catch (e) {
            console.log(e);
            return;
        }
        //Once Game is over, display the result to both the users
        if (this.board.isGameOver()) {
            const game_winner = this.board.turn() === 'w' ? "black" : "white";
            this.player1.send(JSON.stringify({
                type: message_1.GAME_OVER,
                payload: { game_winner }
            }));
            this.player2.send(JSON.stringify({
                type: message_1.GAME_OVER,
                payload: { game_winner }
            }));
            return;
        }
        // const moveMessage = JSON.stringify({
        //     type: MOVE,
        //     payload: moveToMake
        // })
        // this.player1.send(moveMessage);
        // this.player2.send(moveMessage);
        if (this.moveCount % 2 === 0) {
            this.player2.send(JSON.stringify({
                type: message_1.MOVE,
                payload: moveToMake
            }));
        }
        else {
            this.player1.send(JSON.stringify({
                type: message_1.MOVE,
                payload: moveToMake
            }));
        }
        this.moveCount++;
    }
}
exports.Game = Game;
