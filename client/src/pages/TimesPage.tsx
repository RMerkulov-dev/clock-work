import React from "react";

import AddTimes from "../components/AddTimes";
import UserTotalTime from "../components/UserTotalTime";

const TimesPage = () => {
  return (
    <div className="container">
      <div>Avatar</div>
      <div>
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg ">
          {/*@ts-ignore*/}
          <AddTimes />
        </div>
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
          Today list of times
        </div>
      </div>
      <div>
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
          {/*@ts-ignore*/}
          <UserTotalTime />
        </div>
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
          This week
        </div>
      </div>
    </div>
  );
};

export default TimesPage;
