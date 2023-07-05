import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import {
  loginValidation,
  registerValidation,
} from "./validations/validation.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import { getMe, login, register } from "./controllers/UserController.js";
import checkAuth from "./utils/checkAuth.js";

const app = express();

//MIDDLEWARES
dotenv.config();
app.use(express.json());
app.use(cors());

//ROUTES

app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  register
);

app.post("/auth/login", loginValidation, handleValidationErrors, login);

app.get("/auth/me", checkAuth, getMe);

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
