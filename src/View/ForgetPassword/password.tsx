import React, { useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

const ResetPasswordPage: React.FC = (props) => {
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/reset-password/`,
        {
          password,
        }
      );

      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      setError(
        "Une erreur s'est produite lors de la réinitialisation du mot de passe."
      );
    }
  };

  if (success) {
    return (
      <div>
        <h1>Mot de passe réinitialisé avec succès!</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Réinitialisation du mot de passe</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">Nouveau mot de passe :</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <label htmlFor="confirmPassword">Confirmez le mot de passe :</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
        />
        <button type="submit">Réinitialiser le mot de passe</button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
