import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Accueil from "./Accueil";
import Connexion from "./Connexion";
import Inscription from "./Inscription";
import ListWithButton from "./ListWithButton";
import ForgetPassword from "./ForgetPassword";

import Apitest from "./testapi";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Accueil} />
        <Route exact path="/connexion" component={Connexion} />
        <Route exact path="/forget" component={ForgetPassword} />
        <Route exact path="/inscription" component={Inscription} />
        <Route exact path="/gestion" component={ListWithButton} />
        <Route path="/data" component={Apitest} />
      </Switch>
    </Router>
  );
}

export default Routes;
