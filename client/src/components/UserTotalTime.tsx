import React, { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { setUserHeader } from "../utils/axios-utils";
import useGetTotalTime from "../hooks/useGetTotalTime";
import toast from "react-hot-toast";
import { currentDateIntervals, formatTime } from "../helpers/times";

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

  const dayIntervals = currentDateIntervals(timeIntervals, currentDate);

  return (
    <div className="rounded-xl p-4">
      <h2 className="text-2xl text-amber-100">Time Intervals:</h2>
      <ul className=" h-[100px] overflow-auto rounded-xl border-[1px] border-amber-100 border-opacity-95 py-2 px-4">
        {dayIntervals.map((interval) => (
          <li key={interval._id}>
            <span>
              Start: {formatTime(new Date(interval.startTime))}, End:{" "}
              {formatTime(new Date(interval.endTime))}
            </span>
          </li>
        ))}
      </ul>
      <div> </div>
    </div>
  );
};

export default UserTotalTime;
