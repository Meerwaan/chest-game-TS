import React, { useEffect, useState } from "react";
import Chessboard from "chessboardjsx";
import "./chessboard.css"; // Importez le fichier CSS
import { useLocation } from "react-router-dom";
import axios from "axios";

function ChessGameBoard() {
  const [coins, setCoins] = useState(0)
  const [pseudo1, setPseudo1] = useState("");
  const [pseudo2, setPseudo2] = useState("");
  const [pricebase, setPricebase] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
        axios
            .get("http://localhost:3000/getCoins", {
                params: {
                    nom: pseudo1,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                  setCoins(res.data)
                  
                    
                  
                }
            })
            .catch((err) => {
                //console.log(err);
                window.location.href = "http://localhost:3001/gestion";
            });
    }, 1000);
    return () => clearInterval(interval);
}, []);

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
            setPricebase(res.data.price);
            console.log(coins )
            console.log(res.data.price)
            console.log(coins + res.data.price)
          
            
            
          
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
              if (pseudo2 !== null) {
                
                
                axios
                  .post("http://localhost:3000/refundgame", {
                    gameName: localStorage.getItem("gameName"),
                    nom: pseudo1,
                    price: coins + pricebase,
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
                    parseInt(localStorage.getItem("coins")!) + pricebase
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
