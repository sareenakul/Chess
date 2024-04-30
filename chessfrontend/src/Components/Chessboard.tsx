import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";

export const Chessboard = ({board, socket} : {
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket: WebSocket;
}) =>{
    //continue from here after qula
    const [from, setFrom] = useState();
    return <div className="text-white-200">
            {board.map((row,i) =>{
                return <div key={i} className="flex">
                    {row.map((square, j) =>{
                        return <div key={j} className={`w-16 h-16 ${(i+j)%2 === 0 ? 'bg-red-500' : 'bg-white'}`}>
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