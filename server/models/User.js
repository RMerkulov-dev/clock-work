import mongoose from "mongoose";
import TimeIntervalSchema from "./Time.js";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: String,
    timeIntervals: [TimeIntervalSchema], // Corrected field name here
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
