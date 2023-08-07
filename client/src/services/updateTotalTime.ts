import { apiClient } from "../utils/axios-utils";

export const updateTotalTime = async (userId: string | null, data: number) => {
  if (!userId) {
    return null;
  }

  const res = await apiClient.put(`/api/users/${userId}/total-time`, data);
  return res.data;
};
