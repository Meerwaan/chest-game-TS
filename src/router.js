import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Accueil from "./Accueil";
import Connexion from "./Connexion";
import Inscription from "./Inscription";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Accueil} />
        <Route exact path="/connexion" component={Connexion} />
        <Route exact path="/inscription" component={Inscription} />
      </Switch>
    </Router>
  );
}

export default Routes;
