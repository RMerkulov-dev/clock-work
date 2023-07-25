import { QueryKey, useQuery } from "@tanstack/react-query";
import { getUser } from "../services/getUser";

export const useUserInfo = () => {
  const queryKey: QueryKey = ["userInfo"];
  return useQuery({ queryKey: ["userInfo"], queryFn: getUser });
};
