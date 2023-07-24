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
  getIntervals,
  saveTimeInterval,
} from "./controllers/TimeController.js";

const app = express();

//MIDDLEWARES
dotenv.config();
app.use(express.json());
app.use(cors());

//ROUTES

//register user
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  register
);
//login user
app.post("/auth/login", loginValidation, handleValidationErrors, login);
//get user info
app.get("/auth/me", getMe);
//add time interval for a user
app.post("/users/:userId/time-intervals", saveTimeInterval);
//get the total time of a user
app.get("/users/:userId/time-intervals", getIntervals);
//get all users
app.get("/users", getAllUsers);

//CONNECT TO DB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB error", err));

app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("Server OK");
});
