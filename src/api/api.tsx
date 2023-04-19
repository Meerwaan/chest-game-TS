import axios, { AxiosResponse } from "axios";

const API_URL = "http://localhost:8000";

export function fetchData(): Promise<string> {
  return axios.get(`${API_URL}/data`).then((response: AxiosResponse) => response.data.message);
}

export function inscription(nom: string, email: string, motDePasse: string): Promise<string> {
  return axios.post(`${API_URL}/inscription`, { nom, email, motDePasse }).then((response: AxiosResponse) => response.data.message);
}

export function addUser(nom: string, email: string, motDePasse: string) {
  const API_URLl = "http://localhost:8000/adduser"; // l'URL de votre serveur

  axios.post(API_URLl, {
    nom,
    email,
    motDePasse
  }).then(response => {
    console.log(response.data); // afficher la réponse du serveur
  }).catch(error => {
    console.error(error); // afficher l'erreur en cas d'échec de la requête
  });
}

