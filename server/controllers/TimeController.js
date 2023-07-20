import User from "../models/User.js";

// Function to update the total time for a user
export const updateTotalTime = async (req, res) => {
  try {
    const { userId } = req.params;
    const { totalTime } = req.body;

    //Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the total time for the user
    user.totalTime = totalTime;
    await user.save();
    res.status(200).json({ message: "Total time updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating total time", err });
  }
};

// Function to get the total time for a user
export const getTotalTime = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ totalTime: user.totalTime });
  } catch (error) {
    res.status(500).json({ message: "Error getting total time", error });
  }
};
