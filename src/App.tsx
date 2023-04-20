import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Inscription from "./View/inscription/inscription";
import Connexion from "./View/connexion/connexion";
import Accueil from "./View/acceuil/accueil";
import ChessBoard from "./View/chessgameboard/chessboard";
import testapi from "./View/testapi/testapi";
import Apitest from "./View/testapi/testapi";
import Gestion from "./View/gestion/gestion";
import ForgetPassword from "./View/ForgetPassword/forgetPassword";
import ResetPasswordPage from "./View/ForgetPassword/password";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/connexion" Component={Connexion} />
          <Route path="/inscription" Component={Inscription} />
          <Route path="/forget" Component={ForgetPassword} />
          <Route path="/" Component={Accueil} />
          <Route path="/gestion" Component={Gestion} />
          <Route path="/chessboard" Component={ChessBoard} />
          <Route path="/data" Component={testapi} />
          <Route path="/password/:email" Component={ResetPasswordPage} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
