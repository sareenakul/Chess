import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../Pages/Game";

export const Chessboard = ({ chess, board, socket, setBoard} : {
    chess: any;
    setBoard: any;
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket: WebSocket;
}) =>{
    //continue from here after qula
    const [from, setFrom] = useState<null | Square>(null);
    // const [to, setTo] = useState<null | Square>(null);
    return <div className="text-white-200">
            {board.map((row,i) =>{
                return <div key={i} className="flex">
                    {row.map((square, j) =>{
                        const squareRep = String.fromCharCode(97 + (j % 8)) + "" + (8 - i) as Square;
                        // console.log(squareRep);
                        return <div onClick={() => {
                            if(!from){
                                setFrom(squareRep);
                            }
                            else{
                                // setTo(square?.square ?? null);
                                socket.send(JSON.stringify({
                                    type: MOVE,
                                    payload: {
                                        move: {
                                            from,
                                            to: squareRep
                                        }
                                    }
                                }))
                                setFrom(null);
                                chess.move({
                                    from,
                                    to: squareRep
                                });
                                setBoard(chess.board())
                                console.log({
                                    from,
                                    to: squareRep
                                })
                            }
                        }} key={j} className={`w-16 h-16 ${(i+j)%2 === 0 ? 'bg-red-500' : 'bg-white'}`}>
                            <div className="w-full justify-center flex h-full">
                                <div className="h-full justify-center flex flex-col">
                                {square ? square.type : ""}
                                </div>
                            </div>
                        </div>
                    })}
                    </div>
            })}
        </div>
};