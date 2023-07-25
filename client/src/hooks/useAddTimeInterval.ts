import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../utils/axios-utils";

const useAddTimeInterval = (userId: string) => {
  const queryClient = useQueryClient();
  const queryKey: QueryKey = ["timeIntervals"]; // Wrap query key in an array

  return useMutation(
    (data: { startTime: Date; endTime: Date; description: string }) => {
      // Convert Date objects to ISO strings before sending the data to the server
      const formattedData = {
        startTime: data.startTime.toISOString(),
        endTime: data.endTime.toISOString(),
        description: data.description,
      };
      console.log(formattedData);

      return apiClient.post(`/users/${userId}/time-intervals`, formattedData);
    },
    {
      onMutate: async (variables) => {
        await queryClient.cancelQueries(queryKey);
        const previousData = queryClient.getQueryData(queryKey);
        // If previousData is not an array or is not available, set it as an empty array
        const newData = Array.isArray(previousData)
          ? [...previousData, variables]
          : [variables];
        queryClient.setQueryData(queryKey, newData);
        return { previousData };
      },
      onError: (err, variables, context: any) => {
        if (context && context.previousData) {
          queryClient.setQueryData(queryKey, context.previousData);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );
};

export default useAddTimeInterval;
