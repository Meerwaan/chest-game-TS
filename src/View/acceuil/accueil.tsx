import React from "react";
import { Link } from "react-router-dom";
import "./accueil.css";

function Accueil() {
  return (
    <div className="container">
      <h1>Bienvenue sur notre site</h1>
      <p>Connectez-vous ou inscrivez-vous pour accéder à nos services.</p>
      <Link to="/connexion"><button>Se connecter</button></Link>
      <Link to="/inscription"><button>S&ldquo;inscrire</button></Link>
    </div>
  );
}

export default Accueil;