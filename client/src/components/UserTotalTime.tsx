import React, { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { apiClient, setUserHeader } from "../utils/axios-utils";
import { useQuery } from "@tanstack/react-query";
import { TotalTime } from "../../../typing";

const getTotalTime = async (userId: string | null) => {
  if (!userId) {
    return null;
  }

  const res = await apiClient.get(`/users/${userId}/total-time`);
  return res.data;
};

const UserTotalTime = () => {
  const { userId, token } = useAuthStore();
  console.log(userId);

  useEffect(() => {
    setUserHeader(token);
  }, [token]);

  const { data, isLoading, isError, error } = useQuery<TotalTime>(
    ["totalTime", userId],
    () => getTotalTime(userId)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    // @ts-ignore
    return <div>Error: {error?.message}</div>;
  }

  const totalTime = data?.totalTime;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Total Time: {totalTime}</p>
    </div>
  );
};

export default UserTotalTime;
