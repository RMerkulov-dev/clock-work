import { body } from "express-validator";

export const loginValidation = [
  body("email", "Wrong email format").isEmail(),
  body("password", "Password need to be at least 5 symbols").isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body("email", "Wrong email format").isEmail(),
  body("password", "Password need to be at least 5 symbols").isLength({
    min: 5,
  }),
  body("fullName", "Add your name").isLength({ min: 3 }),
  body("avatarUrl", "Invalid avatar link").optional().isURL(),
];
