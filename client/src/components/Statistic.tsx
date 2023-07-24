import React from "react";
import { useAuthStore } from "../stores/authStore";
import toast from "react-hot-toast";
import { calculateTotalTime, groupIntervalsByWeek } from "../helpers/times";
import useGetTotalTime from "../hooks/useGetTotalTime";

const Statistic = () => {
  const { userId, token } = useAuthStore();
  const currentDate = new Date().toISOString().slice(0, 10);
  // @ts-ignore
  const { data, isLoading, error } = useGetTotalTime(userId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    // @ts-ignore
    return toast.error("Error loading");
  }

  const totalTimeStatistic = data?.intervals;
  const groupedIntervals = groupIntervalsByWeek(totalTimeStatistic);

  const currentDateIntervals = totalTimeStatistic.filter((interval) => {
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
  const totalAllTime = calculateTotalTime(totalTimeStatistic);

  return (
    <div>
      {" "}
      <p>Total Time for Current Date: {totalCurrentDate}</p>
      <p>Total Time for Current Week: {totalCurrentWeek}</p>
      <p>Total Time Overall: {totalAllTime}</p>
    </div>
  );
};

export default Statistic;
