import React, { useEffect } from "react";
import Chessboard from "chessboardjsx";
import "./chessboard.css"; // Importez le fichier CSS
import { useLocation } from "react-router-dom";
import axios from "axios";

const ChessGameBoard: React.FC = () => {
  const [pseudo1, setPseudo1] = React.useState("");
  const [pseudo2, setPseudo2] = React.useState("");
  const [refund, setRefund] = React.useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("http://localhost:3000/startgame", {
          params: {
            gameName: localStorage.getItem("gameName"),
          },
        })
        .then((res) => {
          if (res.status === 200) {
            //console.log(res.data);
            setPseudo1(res.data.owner);
            setPseudo2(res.data.players[1]);

            setRefund(res.data.price);
            console.log(refund);
          }
        })
        .catch((err) => {
          //console.log(err);
          window.location.href = "http://localhost:3001/gestion";
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

          <button
            onClick={() => {
              if (pseudo2 === null) {
                axios
                  .post("http://localhost:3000/refundgame", {
                    gameName: localStorage.getItem("gameName"),
                    nom: pseudo1,
                    price: parseInt(refund),
                  })
                  .then((res) => {
                    if (res.status === 200) {
                      console.log(res.data);
                      console.log("refund effectuer");
                      return (window.location.href =
                        "http://localhost:3001/gestion");
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    console.log("refund non effectuer");
                  });
                localStorage.setItem(
                  "coins",
                  (
                    parseInt(localStorage.getItem("coins")!) + parseInt(refund)
                  ).toString()
                );
              } else {
                axios
                  .post("http://localhost:3000/deleteGame", {
                    gameName: localStorage.getItem("gameName"),
                  })
                  .then((res) => {
                    if (res.status === 200) {
                      console.log(res.data);
                      console.log("delete effectuer");
                      return (window.location.href =
                        "http://localhost:3001/gestion");
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    console.log("delete non effectuer");
                  });
              }
            }}
          >
            Abandonner
          </button>
        </div>
      </div>
    </>
  );
};

export default ChessGameBoard;
