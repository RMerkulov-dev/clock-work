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
import { PuffLoader } from "react-spinners";
import { useLoading } from "../hooks/useLoading";

const UserTotalTime = () => {
  const loading = useLoading();
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
    return (
      <div>
        loading
        <PuffLoader color="#D97706" size={25} />
      </div>
    );
  }

  if (error) {
    // @ts-ignore
    return toast.error("Error loading");
  }

  // @ts-ignore
  const timeIntervals = data.intervals;

  const dayIntervals = currentDateIntervals(timeIntervals, currentDate);

  const { deleteTimeInterval } = useDeleteTimeInterval(userId);

  const handleDelete = async (intervalId: string) => {
    loading.onLoadingStart();
    try {
      await deleteTimeInterval(intervalId);
      await queryClient.invalidateQueries(["totalTime", userId]);
      toast.success("Interval deleted successfully");
      loading.onLoadingFinish();
    } catch (error) {
      toast.error("Error deleting time interval");
    }
  };

  return (
    <div className=" rounded-xl p-1 z-10 ">
      <h2 className="text-2xl text-amber-100">Time Intervals:</h2>

      <ul className="relative h-[200px] overflow-auto rounded-xl border-[1px] border-amber-100 border-opacity-95 py-2 px-3 mt-2  ">
        {!dayIntervals.length && (
          <p className="  text-xl text-amber-400 opacity-4 w-full h-full flex items-center justify-center">
            You didn't work today, bro!
          </p>
        )}
        {/*@ts-ignore*/}
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
        {loading.isLoading && (
          <div className="absolute left-0 top-0 w-full h-full -z-10 flex items-center justify-center bg-amber-600 opacity-30">
            <PuffLoader color="white" />
          </div>
        )}
      </ul>
    </div>
  );
};

export default UserTotalTime;
