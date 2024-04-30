import { Chessboard } from "../Components/Chessboard";
import { PlayButton } from "../Components/PlayButton";
import { useSocket } from "../Hooks/useSocket";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () =>{
    const socket = useSocket();
    if(!socket){
        return(
            <div>Connecting...</div>
        )
    }
    return(
        <div className="justify-center flex">
            <div className="pt-8 max-w-screen-lg w-full">
                <div className="grid grid-cols-6 gap-4 w-full">
                    <div className="col-span-4 bg-red-400 w-full">
                        <Chessboard/>
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
    )
};