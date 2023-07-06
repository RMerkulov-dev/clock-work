import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";

const fetchAllUsers = () => {
  return request({ url: "/users" });
};

export const useAllUsersData = () => {
  const { isLoading, isError, data, error } = useQuery(
    "allUsers",
    fetchAllUsers
  );
  return data;
};
