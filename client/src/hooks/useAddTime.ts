import axios from "axios";

export const userTotalTime = async (userId: string) => {
  try {
    const response = await axios.get(`/users/${userId}/total-time`);
    const totalTime = response.data.totalTime; // Assuming the response contains a "totalTime" property
    // Handle the totalTime data in your frontend code
    console.log("Total Time:", totalTime);
  } catch (err) {
    console.log(err);
  }
};
// console.log(userTotalTime("64abb490ca1456af04d9fbcf"));
