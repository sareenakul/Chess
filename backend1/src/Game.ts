import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./message";

export class Game{
    public player1: WebSocket;
    public player2: WebSocket;
    public board: Chess;
    private startTime: Date;
    private moveCount = 0;


    constructor(player1: WebSocket, player2: WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();

        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "white"
            }
        }));

        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "black"
            }
        }))
    }

    makeMove(socket: WebSocket, moveToMake: { from : string; to: string;}) {
        //Doesn't let player1 play when it's not it's turn.
        if(this.moveCount % 2 === 0 && socket !== this.player1){
            return;
        }

        //Doesn't let player1 play when it's not it's turn.
        if(this.moveCount % 2 === 1 && socket !== this.player2){
            return;
        }


        try{
            this.board.move(moveToMake);
        }
        catch(e){
            console.log(e);
            return;
        }

        //Once Game is over, display the result to both the users
        if(this.board.isGameOver()){
            const game_winner = this.board.turn() === 'w' ? "black" : "white";

            this.player1.send(JSON.stringify({
                type: GAME_OVER,
                payload: {game_winner}
            }))

            this.player2.send(JSON.stringify({
                type: GAME_OVER,
                payload: {game_winner}
            }))
            return;
        }


        // const moveMessage = JSON.stringify({
        //     type: MOVE,
        //     payload: moveToMake
        // })
        // this.player1.send(moveMessage);
        // this.player2.send(moveMessage);

        if(this.moveCount % 2 === 0){
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload: moveToMake
            }))
        }
        
        else{
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: moveToMake
            }))
        }
        this.moveCount++;
    }
}