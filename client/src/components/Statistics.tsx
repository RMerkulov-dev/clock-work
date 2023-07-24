import React from "react";
import { StatisticsProps } from "../../../typing";

const Statistics = ({ classname, children, title }: StatisticsProps) => {
  return (
    <div className={classname}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default Statistics;
