import React, { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { setUserHeader } from "../utils/axios-utils";
import useGetTotalTime from "../hooks/useGetTotalTime";
import toast from "react-hot-toast";
import { currentDateIntervals, formatTime } from "../helpers/times";
import { BiSolidCircle } from "react-icons/bi";
import useDeleteTimeInterval from "../hooks/useDeleteInterval";
import { useQueryClient } from "@tanstack/react-query";
import { RiDeleteBinLine } from "react-icons/ri";

const UserTotalTime = () => {
  const currentDate = new Date().toISOString().slice(0, 10);
  const { userId, token } = useAuthStore();
  const queryClient = useQueryClient();

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

  // if (!data || data.intervals.length === 0) {
  //   return (
  //     <span className="text-xl text-amber-100 opacity-4">
  //       You didn't work today, bro!
  //     </span>
  //   );
  // }

  const timeIntervals = data.intervals;

  const dayIntervals = currentDateIntervals(timeIntervals, currentDate);

  const { deleteTimeInterval } = useDeleteTimeInterval(userId);

  const handleDelete = async (intervalId: string) => {
    try {
      await deleteTimeInterval(intervalId);
      await queryClient.invalidateQueries(["totalTime", userId]);
      toast.success("Interval deleted successfully");
    } catch (error) {
      toast.error("Error deleting time interval");
    }
  };

  return (
    <div className="rounded-xl p-1">
      <h2 className="text-2xl text-amber-100">Time Intervals:</h2>

      <ul className=" h-[200px] overflow-auto rounded-xl border-[1px] border-amber-100 border-opacity-95 py-2 px-3 mt-2  ">
        {!data ||
          (data.intervals.length === 0 && (
            <p className="text-xl text-amber-400 opacity-4 ">
              You didn't work today, bro!
            </p>
          ))}
        {dayIntervals.map((interval) => (
          <li key={interval._id} className="flex items-center justify-between">
            <span className="w-1/3 text-amber-100">{interval.description}</span>
            <span className="text-orange-300 flex items-center justify-center gap-2">
              <BiSolidCircle className="text-green-300" />{" "}
              {formatTime(new Date(interval.startTime))}
            </span>
            <span className="text-orange-300 flex items-center justify-center gap-2">
              <BiSolidCircle className="text-red-400" />{" "}
              {formatTime(new Date(interval.endTime))}
            </span>
            <RiDeleteBinLine
              size={20}
              onClick={() => handleDelete(interval._id)}
              className="text-orange-600 mr-2 cursor-pointer"
            />
          </li>
        ))}
      </ul>
      <div> </div>
    </div>
  );
};

export default UserTotalTime;
