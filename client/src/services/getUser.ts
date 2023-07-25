import { apiClient } from "../utils/axios-utils";

export const getUser = async () => {
  const res = await apiClient.get(`/auth/me`);
  return res.data;
};
