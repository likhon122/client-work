const express = require("express");

const userRoute = express.Router();
const {
  registerValidation,
  verifyValidation,
  resendCodeValidation,
  forgotPasswordValidation,
  resetPasswordValidation
} = require("../validation/userValidation");

const { runValidation } = require("../validation/validation");
const {
  registerUser,
  verifyUser,
  resendSignUpValidationCode,
  forgotPassword,
  resetPassword,
  getAllUsers,
  deleteSingleUser,
  deleteAllUsers,
  getSingleUser
} = require("../controllers/user.controller");
const { userIsLoggedIn, userIsLoggedOut } = require("../middlewares/auth");

userRoute.get("/get-user", userIsLoggedIn, getSingleUser);

userRoute.get("/all-users", userIsLoggedIn, getAllUsers);

userRoute.post(
  "/register",
  userIsLoggedOut,
  registerValidation,
  runValidation,
  registerUser
);

userRoute.post(
  "/verify",
  userIsLoggedOut,
  verifyValidation,
  runValidation,
  verifyUser
);

userRoute.post(
  "/resend-code",
  userIsLoggedOut,
  resendCodeValidation,
  runValidation,
  resendSignUpValidationCode
);

userRoute.post(
  "/forgot-password",
  userIsLoggedOut,
  forgotPasswordValidation,
  runValidation,
  forgotPassword
);

userRoute.post(
  "/reset-password",
  userIsLoggedOut,
  resetPasswordValidation,
  runValidation,
  resetPassword
);

userRoute.delete("/delete-user/:id", userIsLoggedIn, deleteSingleUser);
userRoute.delete("/delete-all-users", userIsLoggedIn, deleteAllUsers);

module.exports = userRoute;
