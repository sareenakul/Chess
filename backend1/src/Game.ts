import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER } from "./message";

export class Game{
    public player1: WebSocket;
    public player2: WebSocket;
    public board: Chess;
    private startTime: Date;


    constructor(player1: WebSocket, player2: WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
    }

    makeMove(socket: WebSocket, moveToMake: { from : string; to: string;}) {
        //Doesn't let player1 play when it's not it's turn.
        if(this.board.moves.length % 2 === 1 && socket != this.player1){
            return;
        }

        //Doesn't let player1 play when it's not it's turn.
        if(this.board.moves.length % 2 !== 1 && socket != this.player2){
            return;
        }

        try{
            this.board.move(moveToMake);
        }
        catch(e){
            return;
        }

        //Once Game is over, display the result to both the users
        if(this.board.isGameOver()){
            this.player1.emit(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w'? "black" : "white"
                }
            }))

            this.player2.emit(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w'? "black" : "white"
                }
            }))
            return;
        }

        //Validate the right user's move
        //Validate the move
        //Update the board
        //Push the move
        //Check if game Over
        //Send the updated board
    }
}