import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../utils/axios-utils";

const fetchAllUsers = () => {
  return request({ url: "/users" });
};

export const useAllUsersData = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: fetchAllUsers,
  });
  return data;
};
