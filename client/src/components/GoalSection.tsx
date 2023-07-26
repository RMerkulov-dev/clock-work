import ProgressBar from "@ramonak/react-progress-bar";
import React, { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import Select from "react-select";
import {
  calculateTotalMinutes,
  currentDateIntervals,
  groupIntervalsByWeek,
  optionsDay,
  optionsWeek,
} from "../helpers/times";
import useGetTotalTime from "../hooks/useGetTotalTime";
import toast from "react-hot-toast";

const GoalSection = () => {
  const [selectedOptionDay, setSelectedOptionDay] = useState(optionsDay[0]);
  const [selectedOptionDWeek, setSelectedOptionDWeek] = useState(
    optionsWeek[0]
  );
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
  // @ts-ignore
  const groupedIntervals = groupIntervalsByWeek(totalTimeStatistic);
  // Calculate total time for the current date
  const totalCurrentDate = calculateTotalMinutes(
    currentDateIntervals(totalTimeStatistic, currentDate)
  );

  // Calculate total time for the current week
  const currentWeekIntervals =
    groupedIntervals.length > 0 ? groupedIntervals[0][1] : [];
  // @ts-ignore
  const totalCurrentWeek = calculateTotalMinutes(currentWeekIntervals);

  const progressValueDay = parseInt(
    ((totalCurrentDate / selectedOptionDay.value) * 100).toFixed(0)
  );

  const progressValueWeek = parseInt(
    ((totalCurrentWeek / selectedOptionDWeek.value) * 100).toFixed(0)
  );

  return (
    <div className="flex flex-col items-start justify-center gap-7">
      <div className="flex items-center justify-baseline gap-3 ">
        <p className="text-xl text-amber-100 w-[120px]">DAY GOAL</p>
        <Select
          className=" bg-transparent w-[130px]"
          options={optionsDay}
          defaultValue={selectedOptionDay}
          // @ts-ignore
          onChange={(selectedOption) => setSelectedOptionDay(selectedOption)}
        />
      </div>
      <div className="flex items-center justify-baseline gap-3  ">
        <p className="text-xl text-amber-100 w-[120px]">WEEK GOAL</p>
        <Select
          className="w-[130px]"
          options={optionsWeek}
          defaultValue={selectedOptionDWeek}
          // @ts-ignore
          onChange={(selectedOption) => setSelectedOptionDWeek(selectedOption)}
        />
      </div>
      <div className="w-full ">
        <p className="mb-2 text-l text-amber-100">
          {" "}
          {`Day Goal: ${selectedOptionDay.value / 60}h `}
        </p>
        <ProgressBar
          completed={totalCurrentDate}
          maxCompleted={selectedOptionDay.value}
          customLabel={`${progressValueDay}%`}
          height="40px"
          animateOnRender
          bgColor={"#ed7947"}
          labelClassName="label-bar"
        />
      </div>
      <div className="w-full ">
        <p className="mb-2 text-l text-amber-100">
          {" "}
          {`Week Goal: ${selectedOptionDWeek.value / 60}h `}
        </p>
        <ProgressBar
          completed={totalCurrentWeek}
          maxCompleted={selectedOptionDWeek.value}
          customLabel={`${progressValueWeek}%`}
          height="40px"
          animateOnRender
          bgColor={"#b684e0"}
          labelClassName="label-bar"
        />
      </div>
    </div>
  );
};

export default GoalSection;
