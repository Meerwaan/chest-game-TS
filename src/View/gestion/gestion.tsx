import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import "./gestion.css";
import axios from "axios";

function ListWithButton() {
    const navigate = useNavigate();

    const redirectToChessGameBoard = (name:string) => {
        localStorage.setItem("gameName",name);
        navigate("/chessboard");
    };



    const [list, setList] = useState([
        { name: "pseudo", players: "1/2", price: "0" },
    ]);
    const [list2, setList2] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [selectedPrice, setSelectedPrice] = useState("");
    const [gameInputValue, setGameInputValue] = useState("");
    const [list3, setList3] = useState<{ gameName: string; owner: string; price: string }[]>([]);
    const [sortPrice, setSortPrice] = useState("");
    const [newPrice, setNewPrice] = useState("0");
    const nom = localStorage.getItem("nom");
    const id = localStorage.getItem("id");
    const proprietaire = nom;
    const handleAddItem = () => {
        let name;
        if (nom) {
            name = gameInputValue;
        } else {
            name = "Error name ot found";
        }
        setList([...list, { name: name, players: "1/2", price: newPrice }]);
        axios.post("http://localhost:3000/addgame", {
            nom: nom,
            gameName: name,
            gamePrice: newPrice
        })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    };

    useEffect(() => {
        axios
            .get("http://localhost:3000/friends", {
                params: {
                    nom: nom,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    setList2(res.data);
                }
            })
            .catch((err) => {
                alert("Erreur lors de la flop");
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:3000/game", {
                
            })
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data)
                    setList3(res.data);
                }
            })
            .catch((err) => {
                alert("Erreur lors de la flop");
                console.log(err);
            });

    }, []);



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
                        setList2([]);
                        setInputValue("");
                    }
                }
            })
            .catch((err) => {
                alert("Erreur lors de la flop");
                console.log(err);
            });

    };

    const handleDeleteFriend = (friends: string) => {
        axios
            .delete("http://localhost:3000/delfriends", {
                params: {
                    nom: friends,
                    proprietaire: nom,
                },
            })

            .then((response) => {

                console.log("Ami supprimé.");

            })
            .catch((error) => {

                console.log("Erreur lors de la suppression de l'ami.");
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

    const handleNamegame = (e: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setGameInputValue(e.target.value);
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
            ? list3.filter((item) => item.price === "0")
            : selectedPrice === "Payant"
                ? list3.filter((item) => item.price !== "0")
                : list3;

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
                                    onClick={() => handleDeleteFriend(item)}
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
                            Choisissez le nom de votre partie :
                        </span>

                        <input
                            type="text"
                            placeholder="Nom de la partie"
                            value={gameInputValue}
                            onChange={(e) => setGameInputValue(e.target.value)}


                        />


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
                    <button className="create-game-button" onClick={()=>{handleAddItem(); redirectToChessGameBoard(gameInputValue);}}>
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
                    {sortList(filteredList).length > 0 && sortList(filteredList).map((item: any, index: number) => (
                        <li key={index} className="game-item">
                            <div className="game-info">
                                <span className="game-title">{item.gameName}</span>
                                <span className="game-players">
                                    nombre de joueur : {item.owner}
                                </span>
                                <span className="game-price">
                                    Prix de la partie :{" "}
                                    {item.price === "0" ? "Gratuit" : item.price}
                                </span>
                            </div>
                            <button
                                className="join-button"
                                onClick={()=>redirectToChessGameBoard(item.gameName)}
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