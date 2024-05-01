"use strict";
// interface Game{
//     id: number;
//     name: string;
//     player1: WebSocket[];
//     player2: WebSocket[];
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChessManager = void 0;
const message_1 = require("./message");
const Game_1 = require("./Game");
class ChessManager {
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    addUser(socket) {
        this.users.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket) {
        this.users = this.users.filter(user => user !== socket);
    }
    addHandler(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            //initiallizes the game
            if (message.type === message_1.INIT_GAME) {
                //checks if there exists a pending user at moment
                //If yes, then call the Game constructor and add the socket and pendingUser as 2 players.
                if (this.pendingUser) {
                    const game = new Game_1.Game(this.pendingUser, socket);
                    //Add the game to our list of games.
                    this.games.push(game);
                    // Empty the post of pendingUser after assignment of the game.
                    this.pendingUser = null;
                }
                //If no then declare the socket as the pendingUser.
                else {
                    this.pendingUser = socket;
                }
            }
            //When Socket plays a Move
            if (message.type === message_1.MOVE) {
                //assigns a game that is being played by the socket.
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                //If such a game exists then make the move by the socket
                if (game) {
                    game.makeMove(socket, message.payload.move);
                }
            }
        });
    }
}
exports.ChessManager = ChessManager;
