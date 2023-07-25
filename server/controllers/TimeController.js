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
