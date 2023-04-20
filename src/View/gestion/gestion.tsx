import React, { useState } from "react";
import "./gestion.css";

function ListWithButton() {
    const [list, setList] = useState([
        { name: "pseudo", players: "1/2", price: "Gratuit" },
        { name: "pas", players: "2/2", price: "100" },
        { name: "ouf", players: "1/2", price: "Gratuit" },
    ]);
    const [list2, setList2] = useState(["pseudo", "pas", "ouf"]);
    const [inputValue, setInputValue] = useState("");
    const [selectedPrice, setSelectedPrice] = useState("");
    const [newPrice, setNewPrice] = useState("0");
    const handleAddItem = () => {
        let valuePrice
        console.log(newPrice)
        if(newPrice == "0"){

            valuePrice = "Gratuit"
        }else {
            valuePrice = newPrice
        }
        setList([...list, { name: "", players: "1/2", price: valuePrice }]);
        setInputValue("");
    };

    const handleAddFriend = () => {
        setList2([...list2, inputValue]);
        setInputValue("");
    };

    const handlePriceFilter = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedPrice(e.target.value);
    };

    const filteredList =
        selectedPrice === "Gratuit"
            ? list.filter((item) => item.price === "Gratuit")
            : selectedPrice === "Payant"
                ? list.filter((item) => item.price !== "Gratuit")
                : list;

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
                        value={inputValue }
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
                    
                    <input
                        type="number"
                        min="0" 
                        max="200"
                        step="10"
                        placeholder="Mise de la partie"
                        value= {newPrice}
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
                </form>
                <ul className="games-list">
                    {filteredList.map((item, index) => (
                        <li key={index} className="game-item">
                            <div className="game-info">
                                <span className="game-title">{item.name}</span>
                                <span className="game-players">nombre de joueur : {item.players}</span>
                                <span className="game-price">Prix de la partie : {item.price}</span>
                            </div>
                            <button className="join-button">Rejoindre</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ListWithButton;
