import axios, { AxiosResponse } from "axios";

const API_URL = "http://localhost:8000";

export function fetchData(): Promise<string> {
  return axios.get(`${API_URL}/data`).then((response: AxiosResponse) => response.data.message);
}
