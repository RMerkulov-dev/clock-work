import React from "react";
import { useUserTotalTime } from "../hooks/useUserTotalTime";

const UserTotalTime = ({ userId }: { userId: string }) => {
  const { data, isLoading, isError, error } = useUserTotalTime(userId);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error?.message}</p>;
  }

  return <p>User Total Time: {data?.totalTime}</p>;
};

export default UserTotalTime;
