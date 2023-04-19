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
    setList2([...list, inputValue]);
    setInputValue("");
  };

  return (
    <div className="Main">
      <div className="containerTitle">
        <p className="left-p">Pseudo du joueur connecté</p>
        <p className="right-p">Nombre de pièces</p>
      </div>
      <div className="containerFriend">
        <ul className="list">
        {list2.map((item, index) => (
            <li key={index}>
              {item}  <button className="buttonDefi" >
          Defier un ami
        </button>
            </li>
          ))}
        </ul>
        <button className="button" onClick={handleAddFriend}>Ajouter un ami</button>
      </div>
      <div className="containerPartie">
        <select name="pets" id="pet-select">
          <option value="">--Please choose an option--</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="hamster">Hamster</option>
          <option value="parrot">Parrot</option>
          <option value="spider">Spider</option>
          <option value="goldfish">Goldfish</option>
        </select>
        <select name="pets" id="pet-select">
          <option value="">--Please choose an option--</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="hamster">Hamster</option>
          <option value="parrot">Parrot</option>
          <option value="spider">Spider</option>
          <option value="goldfish">Goldfish</option>
        </select>
        <button className="button" onClick={handleAddItem}>
          Créer une nouvelle partie
        </button>
        <h3>Liste des parties disponibles</h3>
        <ul className="list">
          {list.map((item, index) => (
            <li key={index}>
              {item} Nombre de joueur : 1/2
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ListWithButton;
