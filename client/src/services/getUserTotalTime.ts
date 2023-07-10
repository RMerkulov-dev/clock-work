import axios from "axios";
import { UserTotalTime } from "../../../typing";
import { BASE_URL } from "../utils/axios-utils";

export const fetchUserTotalTime = async (
  userId: string
): Promise<UserTotalTime> => {
  try {
    const response = await axios.get<UserTotalTime>(
      `${BASE_URL}/users/${userId}/total-time`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
