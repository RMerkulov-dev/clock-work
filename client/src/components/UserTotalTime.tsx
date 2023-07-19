import React, { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { useCurrentUserTotalTime } from "../services/getUserTotalTime";
import { setUserHeader } from "../utils/axios-utils";

const UserTotalTime = () => {
  const { userId, token } = useAuthStore();
  console.log(userId);

  useEffect(() => {
    setUserHeader(token); // Make sure to set the token in the headers when it changes
  }, [token]);

  // @ts-ignore
  const { data, isLoading, isError, error } = useCurrentUserTotalTime(userId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  const totalTime = data?.totalTime;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Total Time: {totalTime}</p>
      {/* Render other user information */}
    </div>
  );
};

export default UserTotalTime;
