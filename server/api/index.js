import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

//MIDDLEWARES
dotenv.config();
app.use(express.json());
app.use(cors());

//ROUTES

//versel test
app.get("/api", (req, res) => {
  res.send(`<h5 style="color:green">
        Hey Geek! you just deployed serverless express api</h5>`);
});

//register user
// app.post(
//   "/auth/register",
//   registerValidation,
//   handleValidationErrors,
//   register
// );
// //login user
// app.post("/auth/login", loginValidation, handleValidationErrors, login);
// //get user info
// app.get("/auth/me", checkAuth, getMe);
// //add time interval for a user
// app.post("/users/:userId/time-intervals", saveTimeInterval);
// //delete time intervals
// app.delete("/users/:userId/time-intervals", deleteTimeInterval);
// //get the total time of a user
// app.get("/users/:userId/time-intervals", getIntervals);
// //get all users
// app.get("/users", getAllUsers);
//
// //CONNECT TO DB
// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => console.log("DB OK"))
//   .catch((err) => console.log("DB error", err));
//
// app.listen(process.env.PORT, (error) => {
//   if (error) {
//     console.log(error);
//   }
//   console.log("Server OK");
// });

export default app;
