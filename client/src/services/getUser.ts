import { apiClient } from "../utils/axios-utils";

export const getUser = async () => {
  const res = await apiClient.get(`/api/auth/me`);
  return res.data;
};
