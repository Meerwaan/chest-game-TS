import Chessground from "@react-chess/chessground";

import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";

import {Chess} from "chess.js";
import React from "react";


function ChessFront() {
  const options = {
    // options de configuration
    
  };
  const game = new Chess(); 

  return <Chessground {...options} />;
}

export default ChessFront;