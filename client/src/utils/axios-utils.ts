import axios from "axios";

const BASE_URL = "http://localhost:3002";

const apiClient = axios.create({ baseURL: BASE_URL });

export const setUserIdHeader = (userId: string | null) => {
  if (userId) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${userId}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

export { BASE_URL, apiClient };
