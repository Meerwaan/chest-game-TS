import axios from 'axios';

const API_URL = 'http://localhost:8000';

export function fetchData() {
  return axios.get(`${API_URL}/data`).then(response => response.data.message);
}
