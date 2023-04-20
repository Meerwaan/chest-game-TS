import React from "react";
import Chessboard from "chessboardjsx";
import "./chessboard.css"; // Importez le fichier CSS

const ChessGameBoard: React.FC = () => {
    const chessboardProps: React.ComponentProps<typeof Chessboard> = {
        position: "start",
        orientation: "white",
        // Ajoutez d'autres props que vous souhaitez utiliser
    };

    return (
        <>
            <div className="container">
                <div className="chessboard">
                    <Chessboard {...chessboardProps} />
                </div>

                <div className="game-menu">
                    <div className="player">
                        <h2>Joueur 1</h2>
                        <h2>VS</h2>
                        <h2>Joueur 2</h2>
                    </div>


                </div>
            </div>
        </>
    );
};

export default ChessGameBoard;
