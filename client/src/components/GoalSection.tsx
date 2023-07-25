import ProgressBar from "@ramonak/react-progress-bar";
import React, { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import Select from "react-select";
import { currentDateIntervals, options } from "../helpers/times";
import useGetTotalTime from "../hooks/useGetTotalTime";
import toast from "react-hot-toast";

const GoalSection = () => {
  const [goal, setGoal] = useState("");
  const [selectedOption, setSelectedOption] = useState(options[0]);
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

  const tetsMin = (intervals: any[]) => {
    let totalMinutes = 0;

    intervals.forEach((interval) => {
      const startTime = new Date(interval.startTime);
      const endTime = new Date(interval.endTime);
      const difference = endTime.getTime() - startTime.getTime();
      totalMinutes += difference / (1000 * 60);
    });

    return totalMinutes;
  };

  const totalTimeStatistic = data?.intervals;
  // Calculate total time for the current date
  const totalCurrentDate = tetsMin(
    currentDateIntervals(totalTimeStatistic, currentDate)
  );
  console.log(totalCurrentDate);
  console.log("option", selectedOption.value);

  const progressValue = parseInt(
    ((totalCurrentDate / selectedOption.value) * 100).toFixed(0)
  );

  return (
    <div className="flex flex-col items-start justify-center gap-7">
      <div className="flex items-center justify-baseline gap-3">
        <p className="text-xl text-amber-100">Goal</p>
        <Select
          options={options}
          defaultValue={selectedOption}
          // @ts-ignore
          onChange={(selectedOption) => setSelectedOption(selectedOption)}
        />
      </div>
      <div className="w-full ">
        <p className="mb-2 text-l text-amber-100">
          {" "}
          {`Day Goal: ${selectedOption.value / 60}h `}
        </p>
        <ProgressBar
          completed={totalCurrentDate}
          maxCompleted={selectedOption.value}
          customLabel={`${progressValue}%`}
          height="40px"
          animateOnRender
          bgColor={"#ed7947"}
          labelClassName="label-bar"
        />
      </div>
      <div className="w-full ">
        <p className="mb-2 text-l text-amber-100">
          {" "}
          {`Week Goal: ${selectedOption.value / 60}h `}
        </p>
        <ProgressBar
          completed={totalCurrentDate}
          maxCompleted={selectedOption.value}
          customLabel={`${progressValue}%`}
          height="40px"
          animateOnRender
          bgColor={"#ed7947"}
          labelClassName="label-bar"
        />
      </div>
    </div>
  );
};

export default GoalSection;
