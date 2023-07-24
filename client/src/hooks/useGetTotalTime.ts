// useGetTotalTime.ts
import { QueryKey, useQuery } from "@tanstack/react-query";
import { apiClient } from "../utils/axios-utils";
import { TimesInterval } from "../../../typing";

const useGetTotalTime = (userId: string) => {
  const queryKey: QueryKey = ["totalTime", userId];

  return useQuery<TimesInterval>(queryKey, async () => {
    const response = await apiClient.get(`/users/${userId}/time-intervals`);
    return response.data;
  });
};

export default useGetTotalTime;
