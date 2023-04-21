import React, { useState } from "react";
import "./forgetPassword.css";
import axios from "axios";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
  };

  return (
    <div className="container">
      <p>{name}</p>
      <div className="card">
        <h2>Mot de passe oublié</h2>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Adresse Mail</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn"
              onClick={() => {
                if (email === "") {
                  alert("Veuillez remplir tous les champs");
                } else {
                  axios
                    .post("http://localhost:3000/forgotPassword", {
                      email: email,
                    })
                    .then((res) => {
                      if (res.status === 200) {
                        alert("Email envoyé");
                        console.log(res.data);
                        setName(res.data);
                      } else {
                        alert("Erreur non gérée");
                      }
                    })
                    .catch((err) => {
                      alert("Erreur lors de l'envoi de l'email");
                      console.log(err);
                    });
                }
              }}
            >
              Envoyez
            </button>
          </form>
        ) : (
          <p>
            Un email vous a été envoyé pour réinitialiser votre mot de passe.
          </p>
        )}
      </div>
    </div>
  );
}

export default ForgetPassword;
