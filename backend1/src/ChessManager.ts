// interface Game{
//     id: number;
//     name: string;
//     player1: WebSocket[];
//     player2: WebSocket[];
// }

import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./message";
import { Game } from "./Game";

export class ChessManager {
    private games : Game[];
    private pendingUser : WebSocket | null;
    private users : WebSocket[];

    constructor(){
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }

    addUser(socket: WebSocket){
        this.users.push(socket);
        this.addHandler(socket)
    }

    removeUser(socket: WebSocket){
        this.users = this.users.filter(user => user !== socket);
    }

    private addHandler(socket : WebSocket){
        socket.on("message", (data) =>{
            const message = JSON.parse(data.toString());

            //initiallizes the game
            if(message.type === INIT_GAME){
                //checks if there exists a pending user at moment
                //If yes, then call the Game constructor and add the socket and pendingUser as 2 players.
                if(this.pendingUser){
                    const game = new Game(this.pendingUser, socket);
                    //Add the game to our list of games.
                    this.games.push(game);
                    // Empty the post of pendingUser after assignment of the game.
                    this.pendingUser = null;
                }
                //If no then declare the socket as the pendingUser.
                else{
                    this.pendingUser = socket;
                }
            }

            //When Socket plays a Move
            if(message.type === MOVE){
                //assigns a game that is being played by the socket.
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                //If such a game exists then make the move by the socket
                if(game){
                    game.makeMove(socket, message.move);
                }
            }
        })
    }
}