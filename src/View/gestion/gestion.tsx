import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./gestion.css";
import axios from "axios";

function ListWithButton() {
  const navigate = useNavigate();

  const redirectToChessGameBoard = () => {
    navigate("/chessboard");
  };

  const [list, setList] = useState([
    { name: "pseudo", players: "1/2", price: "0" },
  ]);
  const [list2, setList2] = useState(["pseudo", "pas", "ouf"]);
  const [inputValue, setInputValue] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [newPrice, setNewPrice] = useState("0");
  const nom = localStorage.getItem("nom");
  const id = localStorage.getItem("id");
  const handleAddItem = () => {
    let name;
    if (nom) {
      name = nom;
    } else {
      name = "Error name ot found";
    }
    setList([...list, { name: name, players: "1/2", price: newPrice }]);
  };

  const handleAddFriend = () => {
    axios
      .post("http://localhost:3000/addfriend", {
        nom: inputValue,
        id: id,
        proprietaire: nom,
      })
      .then((res) => {
        if (res.status === 200) {
          if (inputValue) {
            setList2([...list2, inputValue]);
            setInputValue("");
          }
        }
      })
      .catch((err) => {
        alert("Erreur lors de la flop");
        console.log(err);
      });
  };

  const handlePriceFilter = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedPrice(e.target.value);
  };

  const handlePriceSort = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSortPrice(e.target.value);
  };

  const sortList = (list: any[]) => {
    if (sortPrice === "more") {
      return list.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortPrice === "less") {
      return list.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else {
      return list;
    }
  };

  const filteredList =
    selectedPrice === "Gratuit"
      ? list.filter((item) => item.price === "0")
      : selectedPrice === "Payant"
      ? list.filter((item) => item.price !== "0")
      : list;

  return (
    <div className="main">
      <div className="title-container">
        <h2 className="title">Bienvenue, {nom}</h2>
        <p className="coins">Nombre de pièces : 10</p>
      </div>
      <div className="friends-container">
        <h3 className="subtitle">Amis</h3>
        <ul className="friends-list">
          {list2.map((item, index) => (
            <li key={index} className="friend-item">
              {item}
              <div>
                <button className="defy-button">Defier</button>
                <button
                  className="defy-button"
                  onClick={() => {
                    const newList = [...list2];
                    newList.splice(index, 1);
                    setList2(newList);
                  }}
                >
                  Supprimer
                </button>
              </div>
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
        <h2 className="subtitle">Parties</h2>
        <form className="create-game-form" onSubmit={(e) => e.preventDefault()}>
          <div>
            <h4>Création d&apos;une partie :</h4>

            <span>
              Choisissez votre mise de la partie : (0 = participation Gratuite)
            </span>
          </div>

          <input
            type="number"
            min="0"
            max="200"
            step="10"
            placeholder="Mise de la partie"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <button className="create-game-button" onClick={handleAddItem}>
            Ajouter une partie
          </button>
          <select className="select" onChange={handlePriceFilter}>
            <option value="">--Prix de la partie--</option>
            <option value="Gratuit">Gratuit</option>
            <option value="Payant">Payant</option>
          </select>
          <select className="select" onChange={handlePriceSort}>
            <option value="">--Trie par somme--</option>
            <option value="more">Croissant</option>
            <option value="less">Décroissant</option>
          </select>
        </form>
        <ul className="games-list">
          {sortList(filteredList).map((item, index) => (
            <li key={index} className="game-item">
              <div className="game-info">
                <span className="game-title">{item.name}</span>
                <span className="game-players">
                  nombre de joueur : {item.players}
                </span>
                <span className="game-price">
                  Prix de la partie :{" "}
                  {item.price === "0" ? "Gratuit" : item.price}
                </span>
              </div>
              <button
                className="join-button"
                onClick={redirectToChessGameBoard}
              >
                Rejoindre
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ListWithButton;
