import React, { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { setUserHeader } from "../utils/axios-utils";
import useGetTotalTime from "../hooks/useGetTotalTime";
import toast from "react-hot-toast";

const formatTime = (date: any) => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const calculateTotalTime = (intervals: any[]) => {
  let totalMinutes = 0;

  intervals.forEach((interval) => {
    const startTime = new Date(interval.startTime);
    const endTime = new Date(interval.endTime);
    const difference = endTime.getTime() - startTime.getTime();
    totalMinutes += difference / (1000 * 60);
  });

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours} hours and ${minutes} minutes`;
};

const UserTotalTime = () => {
  const { userId, token } = useAuthStore();

  useEffect(() => {
    setUserHeader(token);
  }, [token]);

  if (!userId) {
    return toast.error("No ID available");
  }

  // @ts-ignore
  const { data, isLoading, error } = useGetTotalTime(userId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    // @ts-ignore
    return toast.error("Error loading");
  }

  if (!data || data.intervals.length === 0) {
    return toast.error("No intervals available");
  }

  const totalTime = calculateTotalTime(data.intervals);

  return (
    <div>
      <h2>Total Time Intervals:</h2>
      <ul>
        {data.intervals.map((interval) => (
          <li key={interval._id}>
            Start: {formatTime(new Date(interval.startTime))}, End:{" "}
            {formatTime(new Date(interval.endTime))}
          </li>
        ))}
      </ul>
      <p>Total Time: {totalTime}</p>
    </div>
  );
};

export default UserTotalTime;
