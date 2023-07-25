import { apiClient, setUserHeader } from "../utils/axios-utils";

const useDeleteTimeInterval = (userId: string) => {
  const deleteTimeInterval = async (intervalId: string) => {
    try {
      setUserHeader(localStorage.getItem("token"));

      await apiClient.delete(`/users/${userId}/time-intervals`, {
        data: { intervalId },
      });
    } catch (error) {
      console.error("Error deleting time interval:", error);
    }
  };

  return { deleteTimeInterval };
};

export default useDeleteTimeInterval;
