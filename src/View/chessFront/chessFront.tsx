import React, { useState } from "react";
import {Chess} from "chess.js";
import Chessground from "@react-chess/chessground";
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";

interface ChessBoardProps {
  fen: string;
  onMove: ({ from, to }: { from: string; to: string }) => void;
  onDrop: ({ sourceSquare, targetSquare }: any) => "snapback" | undefined;
}

function Chessboard() {
  const [fen, setFen] = useState("start");
  const [game, setGame] = useState(new Chess());

  const onMove = ({ from, to }: { from: string; to: string }) => {
    const move = game.move({ from, to, promotion: "q" });
    if (move === null) return;
    setFen(game.fen());
  };

  const onDrop = ({ sourceSquare, targetSquare }: any) => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });
    if (move === null) return "snapback";
    setFen(game.fen());
  };

  return (
    <div>
      <Chessground  onMove={onMove} onDrop={onDrop} />
    </div>
  );
}

export default Chessboard;