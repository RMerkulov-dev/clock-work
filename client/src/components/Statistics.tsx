import React from "react";
import { StatisticsProps } from "../../../typing";

const Statistics = ({ classname, children, title }: StatisticsProps) => {
  return (
    <div className={classname}>
      <h2 className="text-2xl text-amber-100">{title}</h2>
      {children}
    </div>
  );
};

export default Statistics;
