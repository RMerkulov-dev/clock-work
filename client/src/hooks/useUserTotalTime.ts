import { UserTotalTime } from "../../../typing";
import { useQuery } from "@tanstack/react-query";
import { getUserTotalTime } from "../services/getUserTotalTime";

export const useUserTotalTime = (
  userId: string
): {
  data: UserTotalTime | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
} => {
  const { data, isLoading, isError, error } = useQuery<UserTotalTime, Error>(
    ["userTotalTime", userId],
    () => getUserTotalTime(userId)
  );

  return { data, isLoading, isError, error };
};
