import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Inscription from "./View/inscription/inscription";
import Connexion from "./View/connexion/connexion";
import Accueil from "./View/acceuil/accueil";
import ChessFront from "./View/chessFront/chessFront";
import testapi from "./View/testapi/testapi";
import { Chess } from "chess.js"
import Apitest from "./View/testapi/testapi";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/connexion" Component={Connexion} />
          <Route path="/inscription" Component={Inscription} />
          <Route path="/" Component={Accueil} />
          <Route path="/chess" Component={ChessFront} />
          <Route path="/data" Component={testapi} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;