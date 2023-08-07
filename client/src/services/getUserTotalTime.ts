import { apiClient } from "../utils/axios-utils";

export const getTotalTime = async (userId: string | null) => {
  if (!userId) {
    return null;
  }

  const res = await apiClient.get(`/api/users/${userId}/total-time`);
  return res.data;
};
