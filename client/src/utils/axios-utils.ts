import axios from "axios";

const BASE_URL = "https://clock-work-server.vercel.app";

const apiClient = axios.create({ baseURL: BASE_URL });

export const setUserHeader = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

export { BASE_URL, apiClient };
