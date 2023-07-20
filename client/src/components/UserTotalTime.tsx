import React, { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { setUserHeader } from "../utils/axios-utils";
import { useQuery } from "@tanstack/react-query";
import { TotalTime } from "../../../typing";
import { getTotalTime } from "../services/getUserTotalTime";

const UserTotalTime = () => {
  const { userId, token } = useAuthStore();

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
