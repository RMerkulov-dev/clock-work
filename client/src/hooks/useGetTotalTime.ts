// useGetTotalTime.ts
import { QueryKey, useQuery } from "@tanstack/react-query";
import { apiClient } from "../utils/axios-utils";
import { IntervalsProps } from "../../../typing";

const useGetTotalTime = (userId: string) => {
  const queryKey: QueryKey = ["totalTime", userId];

  return useQuery<IntervalsProps>(queryKey, async () => {
    const response = await apiClient.get(`/users/${userId}/time-intervals`);
    return response.data;
  });
};

export default useGetTotalTime;
