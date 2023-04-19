import React, { useState } from "react";
import "./inscription.css";
<<<<<<< HEAD
import { addUser } from "../../api/api";
=======
import axios from "axios";
>>>>>>> 7232730 (fix)

function Inscription() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  const soumettreFormulaire = (e: { preventDefault: () => void }) => {
    e.preventDefault();
<<<<<<< HEAD
    addUser(nom, email, motDePasse)
  }
=======
    // ici, vous pouvez ajouter votre logique pour soumettre le formulaire
  };
>>>>>>> 7232730 (fix)

  return (
    <div className="container">
      <form className="form" onSubmit={soumettreFormulaire}>
        <h1>Inscription</h1>
        <label>
          Nom :
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </label>
        <label>
          Email :
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
            if (nom === "" || email === "" || motDePasse === "") {
              alert("Veuillez remplir tous les champs");
            } else {
              axios.post("http://localhost:8000/adduser", {
                nom: nom,
                email: email,
                motDePasse: motDePasse,
              });
              alert("Inscription réussie");
            }
          }}
        >
          S&ldquo;inscrire
        </button>
      </form>
    </div>
  );
}

export default Inscription;
