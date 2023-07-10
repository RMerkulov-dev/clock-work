import React from "react";

import AddTimes from "../components/AddTimes";
import axios from "axios";
import { BASE_URL } from "../utils/axios-utils";

const TimesPage = () => {
  const userTotalTime = async (userId: string) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/users/:${userId}/total-time`
      );
      const totalTime = response.data.totalTime; // Assuming the response contains a "totalTime" property
      // Handle the totalTime data in your frontend code
      console.log("Total Time:", totalTime);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(userTotalTime("64abb490ca1456af04d9fbcf"));

  return (
    <div className="container">
      <div>Avatar</div>
      <div>
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg ">
          <AddTimes />
        </div>
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
          Today list of times
        </div>
      </div>
      <div>
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
          Total today
        </div>
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
          This week
        </div>
      </div>
    </div>
  );
};

export default TimesPage;
