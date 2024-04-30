import { useEffect, useState } from "react";
import { Chessboard } from "../Components/Chessboard";
import { PlayButton } from "../Components/PlayButton";
import { useSocket } from "../Hooks/useSocket";
import { Chess } from "chess.js";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () =>{
    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());

    useEffect(() =>{
        if(!socket){
            return;
        }
        socket.onmessage = (event) =>{
            const message = JSON.parse(event.data);
            
            switch(message.type){
                case INIT_GAME:
                    setChess(new Chess());
                    setBoard(chess.board());
                    console.log("Game Initialized");
                    break;
                case MOVE:
                    const move = message.payload;
                    chess.move(move);
                    setBoard(chess.board());
                    console.log("Played Move");
                    break;
                case GAME_OVER:
                    console.log("Game Over");
                    break;
            }
        }
    },[socket])
    if(!socket){
        return(
            <div>Connecting...</div>
        )
    }
    return <div className="justify-center flex">
                <div className="pt-8 max-w-screen-lg w-full">
                    <div className="grid grid-cols-6 gap-4 w-full">
                        <div className="col-span-4 w-full flex justify-center">
                            <Chessboard board={board}/>
                        </div>
                        <div className="col-span-2 bg-green-400 w-full">
                            <PlayButton onClick={()=> {
                                socket.send(JSON.stringify({
                                    type: INIT_GAME,
                                }))}}>
                                <h1>Play</h1>
                            </PlayButton>
                        </div>
                    </div>
                </div>
            </div>
};