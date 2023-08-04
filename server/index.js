import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import {
  loginValidation,
  registerValidation,
} from "./validations/validation.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import {
  getAllUsers,
  getMe,
  login,
  register,
} from "./controllers/UserController.js";
import {
  deleteTimeInterval,
  getIntervals,
  saveTimeInterval,
} from "./controllers/TimeController.js";
import checkAuth from "./utils/checkAuth.js";

const index = express();

//MIDDLEWARES
dotenv.config();
index.use(express.json());
index.use(cors());

//ROUTES

//versel test
index.get("/", (req, res) => {
  res.send("Express on Vercel");
});

//register user
index.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  register
);
//login user
index.post("/auth/login", loginValidation, handleValidationErrors, login);
//get user info
index.get("/auth/me", checkAuth, getMe);
//add time interval for a user
index.post("/users/:userId/time-intervals", saveTimeInterval);
//delete time intervals
index.delete("/users/:userId/time-intervals", deleteTimeInterval);
//get the total time of a user
index.get("/users/:userId/time-intervals", getIntervals);
//get all users
index.get("/users", getAllUsers);

//CONNECT TO DB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB error", err));

index.listen(process.env.PORT, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("Server OK");
});

export default index;
