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

  const timeIntervals = data.intervals;
  const groupedIntervals = groupIntervalsByWeek(timeIntervals);

  // Filter intervals for the current date
  const currentDateIntervals = timeIntervals.filter((interval) => {
    const startDate = new Date(interval.startTime).toISOString().slice(0, 10);
    const endDate = new Date(interval.endTime).toISOString().slice(0, 10);
    return startDate === currentDate || endDate === currentDate;
  });

  // Calculate total time for the current date
  const totalCurrentDate = calculateTotalTime(currentDateIntervals);

  // Calculate total time for the current week
  const currentWeekIntervals =
    groupedIntervals.length > 0 ? groupedIntervals[0][1] : [];
  // @ts-ignore
  const totalCurrentWeek = calculateTotalTime(currentWeekIntervals);

  // Calculate total time for all intervals
  const totalAllTime = calculateTotalTime(timeIntervals);

  return (
    <div className="rounded-xl p-4">
      <h2 className="text-2xl text-amber-100">Time Intervals:</h2>
      <ul className=" h-[100px] overflow-auto rounded-xl border-[1px] border-amber-100 border-opacity-95 py-2 px-4">
        {currentDateIntervals.map((interval) => (
          <li key={interval._id}>
            <span>
              Start: {formatTime(new Date(interval.startTime))}, End:{" "}
              {formatTime(new Date(interval.endTime))}
            </span>
          </li>
        ))}
      </ul>
      <div>
        {" "}
        <p>Total Time for Current Date: {totalCurrentDate}</p>
        <p>Total Time for Current Week: {totalCurrentWeek}</p>
        <p>Total Time Overall: {totalAllTime}</p>
      </div>
    </div>
  );
};

export default UserTotalTime;
