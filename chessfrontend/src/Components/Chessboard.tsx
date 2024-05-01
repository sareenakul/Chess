import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../Pages/Game";
import "../assets/BlackPieces/b.png";
import "../assets/BlackPieces/k.png";
import "../assets/BlackPieces/n.png";
import "../assets/BlackPieces/p.png";
import "../assets/BlackPieces/q.png";
import "../assets/BlackPieces/r.png";
import "../assets/WhitePieces/B copy.png";
import "../assets/WhitePieces/K copy.png";
import "../assets/WhitePieces/N copy.png";
import "../assets/WhitePieces/P copy.png";
import "../assets/WhitePieces/Q copy.png";
import "../assets/WhitePieces/R copy.png";



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
                        // console.log("Image name:", square?.color === "b" ? square?.type : `${square?.type?.toUpperCase()} copy`);
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
                                {square ? <img className="w-4" src={`/${square?.color === "b" ?
                                    square?.type : `${square?.type?.toUpperCase()} copy`}.png`} /> :
                                    null}
                                </div>
                            </div>
                        </div>
                    })}
                    </div>
            })}
        </div>
};