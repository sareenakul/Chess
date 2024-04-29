import { Chessboard } from "../Components/Chessboard";

export const Game = () =>{
    return(
        <div className="justify-center flex">
            <div className="pt-8 max-w-screen-lg w-full">
                <div className="grid grid-cols-6 gap-4 w-full">
                    <div className="col-span-4 bg-red-400 w-full">
                        <Chessboard/>
                    </div>
                    <div className="col-span-2 bg-green-400 w-full">
                        <button>Play</button>
                    </div>
                </div>
            </div>
        </div>
    )
};