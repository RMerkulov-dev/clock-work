import User from "../models/User.js";

export const saveTimeInterval = async (req, res) => {
  try {
    const { userId } = req.params;
    const { startTime, endTime, description } = req.body;

    // Parse the ISO strings to Date objects
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add the new time interval to the user's array of timeIntervals
    user.timeIntervals.push({
      startTime: startDate,
      endTime: endDate,
      description,
    });
    await user.save();

    res.status(200).json({ message: "Time interval saved successfully" });
  } catch (err) {
    console.error("Error saving time interval:", err);
    res.status(500).json({ error: "Failed to save time interval" });
  }
};

export const deleteTimeInterval = async (req, res) => {
  try {
    const { userId } = req.params;
    const { intervalId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the index of the interval with the provided intervalId
    const intervalIndex = user.timeIntervals.findIndex(
      (interval) => interval._id.toString() === intervalId
    );

    if (intervalIndex === -1) {
      return res.status(404).json({ error: "Interval not found" });
    }

    // Remove the interval from the user's timeIntervals array
    user.timeIntervals.splice(intervalIndex, 1);
    await user.save();

    res.status(200).json({ message: "Time interval deleted successfully" });
  } catch (err) {
    console.error("Error deleting time interval:", err);
    res.status(500).json({ error: "Failed to delete time interval" });
  }
};

export const getIntervals = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get all time intervals from the user's timeIntervals array
    const intervals = user.timeIntervals;

    res.status(200).json({ intervals });
  } catch (error) {
    console.error("Error getting intervals:", error);
    res.status(500).json({ error: "Failed to get intervals" });
  }
};
