import Chessground from "@react-chess/chessground";

import "@react-chess/chessground/node_modules/chessground/assets/chessground.base.css";

function ChessFront() {
  const options = {
    // options de configuration
  };

  return <Chessground {...options} />;
}

export default ChessFront;