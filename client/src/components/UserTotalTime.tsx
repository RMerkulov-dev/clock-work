import React, { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { setUserHeader } from "../utils/axios-utils";
import useGetTotalTime from "../hooks/useGetTotalTime";
import toast from "react-hot-toast";
import {
  calculateTotalTime,
  formatTime,
  groupIntervalsByWeek,
} from "../helpers/times";

const UserTotalTime = () => {
  const currentDate = new Date().toISOString().slice(0, 10);
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

  let timeIntervals = data.intervals;
  const totalTime = calculateTotalTime(timeIntervals);

  const filteredIntervals = timeIntervals.filter((interval) => {
    const startDate = new Date(interval.startTime).toISOString().slice(0, 10);
    const endDate = new Date(interval.endTime).toISOString().slice(0, 10);
    return startDate === currentDate || endDate === currentDate;
  });

  const groupedIntervals = groupIntervalsByWeek(timeIntervals);

  return (
    <div>
      <h2>Total Time Intervals:</h2>
      <ul>
        {filteredIntervals.map((interval) => (
          <li key={interval._id}>
            <span>
              Start: {formatTime(new Date(interval.startTime))}, End:{" "}
              {formatTime(new Date(interval.endTime))}
            </span>
          </li>
        ))}
      </ul>
      <p>Total Time: {totalTime}</p>
    </div>
  );
};

export default UserTotalTime;
