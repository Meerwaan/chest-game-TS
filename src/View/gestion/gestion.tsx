import React, { useState } from "react";
import "./gestion.css";

function ListWithButton() {
  const [list, setList] = useState(["pseudo", "pas", "ouf"]);
  const [list2, setList2] = useState(["pseudo", "pas", "ouf"]);
  const [inputValue, setInputValue] = useState("");

  const handleAddItem = () => {
    setList([...list, inputValue]);
    setInputValue("");
  };
  const handleAddFriend = () => {
    setList2([...list2, inputValue]);
    setInputValue("");
  };

  return (
    <div className="main">
      <div className="title-container">
        <h2 className="title">Bienvenue, Pseudo du joueur connecté</h2>
        <p className="coins">Nombre de pièces : 10</p>
      </div>
      <div className="friends-container">
        <h3 className="subtitle">Amis</h3>
        <ul className="friends-list">
          {list2.map((item, index) => (
            <li key={index} className="friend-item">
              {item}
              <button className="defy-button">Défier</button>
            </li>
          ))}
        </ul>
        <form className="add-friend-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Ajouter un ami"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="add-friend-input"
          />
          <button className="add-friend-button" onClick={handleAddFriend}>
            Ajouter
          </button>
        </form>
      </div>
      <div className="games-container">
        <h3 className="subtitle">Parties</h3>
        <form className="create-game-form" onSubmit={(e) => e.preventDefault()}>
          <select className="select-game">
            <option value="">--Choisir un jeu--</option>
            <option value="tic-tac-toe">Tic Tac Toe</option>
            <option value="connect-four">Puissance 4</option>
            <option value="chess">Echecs</option>
          </select>
          <select className="select-difficulty">
            <option value="">--Choisir la difficulté--</option>
            <option value="easy">Facile</option>
            <option value="medium">Moyenne</option>
            <option value="hard">Difficile</option>
          </select>
          <button className="create-game-button" onClick={handleAddItem}>
            Créer une partie
          </button>
        </form>
        <ul className="games-list">
          {list.map((item, index) => (
            <li key={index} className="game-item">
              {item}
              <span className="players-count">1/2</span>
              <button className="join-game-button">Rejoindre</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ListWithButton;
