import { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import React from "react";

function ChessFront() {
  const [game, setGame] = useState(new Chess());
  console.log(game);

  function safeGameMutate(modify: (game: Chess) => void) {
    setGame((g) => {
      const update = g;
      modify(update);
      return update;
    });
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.isGameOver() || possibleMoves.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    safeGameMutate((game) => {
      game.move(possibleMoves[randomIndex]);
    });
  }

  function onDrop(source: any, target: any) {
    let move = null;
    safeGameMutate((game) => {
      move = game.move({
        from: source,
        to: target,
        promotion: "q",
      });
    });
    if (move == null) {
      return false;
    }
    setGame(game);
    setTimeout(makeRandomMove, 200);
    return true;
  }

  return (
    <Chessboard id="BasicBoard" position={game.fen()} onPieceDrop={onDrop} />
  );
}

export default ChessFront;
