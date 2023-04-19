import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inscription from './View/inscription/inscription';
import Connexion from './View/connexion/connexion';
import Accueil from './View/acceuil/accueil';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/connexion" Component={Connexion} />
          <Route path="/inscription" Component={Inscription} />
          <Route path="/" Component={Accueil} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;