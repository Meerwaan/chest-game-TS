import React, { useEffect } from "react";
import Chessboard from "chessboardjsx";
import "./chessboard.css"; // Importez le fichier CSS
import { useLocation } from "react-router-dom";
import axios from "axios";



const ChessGameBoard: React.FC = () => {

    const [pseudo1, setPseudo1] = React.useState("");
    const [pseudo2, setPseudo2] = React.useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get("http://localhost:3000/startgame", {
                params: {
                    gameName: localStorage.getItem("gameName"),
                },
            })
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res.data);
                        setPseudo1(res.data.owner);
                        setPseudo2(res.data.players[1]);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }, 1000);
    
        return () => clearInterval(interval);
    }, []);
    

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
                        <h2>{pseudo1}</h2>
                        <h2>VS</h2>
                        <h2>{pseudo2 || "En attente"}</h2>
                    </div>


                </div>
            </div>
        </>
    );
};

export default ChessGameBoard;
