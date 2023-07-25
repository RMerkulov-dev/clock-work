import ProgressBar from "@ramonak/react-progress-bar";
import React, { useState } from "react";
import { useAuthStore } from "../stores/authStore";

const GoalSection = () => {
  const [goal, setGoal] = useState("");
  const [parceGoal, setParceGoal] = useState(0);
  const { userId, token } = useAuthStore();
  const currentDate = new Date().toISOString().slice(0, 10);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setParceGoal(Number(goal));
  };

  return (
    <div className="flex flex-col items-start justify-center gap-7">
      <div>
        <form onSubmit={onSubmit}>
          <label>
            <input type="text" onChange={(e) => setGoal(e.target.value)} />
          </label>
          <button type="submit">Add Goal</button>
        </form>
      </div>
      <div className="w-full ">
        <p> {`Day Goal: ${parceGoal}`}</p>
        <ProgressBar
          completed={20}
          maxCompleted={parceGoal}
          height="40px"
          animateOnRender
          bgColor={"#ed7947"}
          labelClassName="label-bar"
        />
      </div>
      <div className="w-full ">
        <p>Week Goal</p>
        <ProgressBar completed={30} maxCompleted={200} />
      </div>
    </div>
  );
};

export default GoalSection;
