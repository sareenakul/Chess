import { WebSocket } from "ws";

export class Game{
    public player1: WebSocket;
    public player2: WebSocket;
    private board: string;
    private moves: string[];
    private startTime: Date;


    constructor(player1: WebSocket, player2: WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board = "";
        this.moves = [];
        this.startTime = new Date();
    }

    makeMove(socket: WebSocket, move: string) {
        //Validate the right user's move
        //Validate the move
        //Update the board
        //Push the move
        //Check if game Over
        //Send the updated board
    }
}