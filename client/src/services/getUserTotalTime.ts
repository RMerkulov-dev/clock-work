import { UserTotalTime } from "../../../typing";
import { apiClient } from "../utils/axios-utils";
import { useQuery } from "@tanstack/react-query";

export const getCurrentUserTotalTime = async (
  userId: string
): Promise<UserTotalTime> => {
  console.log(
    "Current token in apiClient headers:",
    apiClient.defaults.headers.common["Authorization"]
  );
  const res = await apiClient.get<UserTotalTime>(`/users/${userId}/total-time`);

  return res.data;
};

export const useCurrentUserTotalTime = (userId: string) => {
  return useQuery<UserTotalTime, Error>(["currentUserTotalTime", userId], () =>
    getCurrentUserTotalTime(userId)
  );
};
