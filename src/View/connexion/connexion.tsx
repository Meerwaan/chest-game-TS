import React, { useState } from"react";
import"./connexion.css";

function Connexion() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  const soumettreFormulaire = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // ici, vous pouvez ajouter votre logique pour soumettre le formulaire
  }

  return (
    <div className="container">
      <form className="form" onSubmit={soumettreFormulaire}>
        <h1>Connexion</h1>
        <label>
          Email :
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Mot de passe :
          <input type="password" value={motDePasse} onChange={e => setMotDePasse(e.target.value)} />
        </label>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Connexion;