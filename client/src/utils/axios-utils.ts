import axios from "axios";

const BASE_URL = "http://localhost:3002";

const apiClient = axios.create({ baseURL: BASE_URL });

export const setUserHeader = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
  console.log("User token set:", token);
};

export { BASE_URL, apiClient };
