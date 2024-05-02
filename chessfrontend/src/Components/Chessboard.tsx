import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../Pages/Game";
import b from "../assets/b.png";
import k from "../assets/k.png";
import n from "../assets/n.png";
import p from "../assets/p.png";
import q from "../assets/q.png";
import r from "../assets/r.png";
import Bcopy from "../assets/Bcopy.png";
import Kcopy from "../assets/Kcopy.png";
import Ncopy from "../assets/Ncopy.png";
import Pcopy from "../assets/Pcopy.png";
import Qcopy from "../assets/Qcopy.png";
import Rcopy from "../assets/Rcopy.png";



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
                                {square ? <img className="w-8" 
                                    src={square.color === "b" ?
                                    getImagePath(square.type, true) :
                                    getImagePath(square.type)}
                                alt="" /> :
                                    null}
                                </div>
                            </div>
                        </div>
                    })}
                    </div>
            })}
        </div>
};

const getImagePath = (type: PieceSymbol, isBlack: boolean = false) => {
    switch (type) {
        case "b":
            return isBlack ? b : Bcopy;
        case "k":
            return isBlack ? k : Kcopy;
        case "n":
            return isBlack ? n : Ncopy;
        case "p":
            return isBlack ? p : Pcopy;
        case "q":
            return isBlack ? q : Qcopy;
        case "r":
            return isBlack ? r : Rcopy;
        default:
            return "";
    }
};