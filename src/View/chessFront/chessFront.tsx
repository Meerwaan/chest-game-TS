import Chessground from "@react-chess/chessground";

import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";



function ChessFront() {
  const options = {
    // options de configuration
  };

  return <Chessground {...options} />;
}

export default ChessFront;