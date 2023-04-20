import React, { useState } from "react";
import "./connexion.css";
import axios from "axios";
import { redirect, Navigate, Link } from "react-router-dom";

function Connexion() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  const soumettreFormulaire = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // ici, vous pouvez ajouter votre logique pour soumettre le formulaire
  };

  return (
    <div className="container">
      <form className="form" onSubmit={soumettreFormulaire}>
        <h1>Connexion</h1>
        <label>
          Email :
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Mot de passe :
          <input
            type="password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
          />
        </label>
        <button
          type="submit"
          onClick={() => {
            if (email === "" || motDePasse === "") {
              alert("Veuillez remplir tous les champs");
            } else {
              axios
                .post("http://localhost:3000/login", {
                  email: email,
                  motDePasse: motDePasse,
                })
                .then((res) => {
                  if (res.status === 200) {
                    alert("Connexion réussie");

                    localStorage.setItem("nom", res.data.nom || "pas connecté");
                    localStorage.setItem(
                      "email",
                      res.data.email || "pas connecté"
                    );
                    localStorage.setItem("id", res.data.id);
                    window.location.href = "/gestion";
                  } else {
                    alert("Erreur lors de la connexion");
                  }
                })
                .catch((err) => {
                  alert("Erreur lors de la flop");
                  console.log(err);
                });
            }
          }}
        >
          Se connecter
        </button>
      </form>
      <Link to="/forget">
        <button>Mot de passe oublié ?</button>
      </Link>
    </div>
  );
}

export default Connexion;
