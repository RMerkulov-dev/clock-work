import React from "react";

import AddTimes from "../components/AddTimes";
import UserTotalTime from "../components/UserTotalTime";

const TimesPage = () => {
  return (
    <div className="container">
      <div className="p-3 flex items-center justify-end">Avatar</div>
      <div className="flex flex-col justify-between mt-3">
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl drop-shadow-lg w-full p-4 ">
          {/*@ts-ignore*/}
          <AddTimes />
        </div>
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl drop-shadow-lg mt-3 p-4">
          {/*@ts-ignore*/}
          <UserTotalTime />
        </div>
      </div>
      <div>
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg"></div>
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
          This week
        </div>
      </div>
    </div>
  );
};

export default TimesPage;
