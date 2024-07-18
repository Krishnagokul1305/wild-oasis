const express = require("express");
const userRoute = express.Router();

// controllers
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

// route for single user functionalities
userRoute.route("/signin").post(authController.signin);
userRoute.route("/login").post(authController.login);
userRoute
  .route("/updatePassword")
  .post(authController.protect, authController.updatePassword);

// forgot password implementation
userRoute.route("/forgotPassword").post(authController.forgotPassword);
userRoute
  .route("/resetPassword/:resetToken")
  .post(authController.resetPassword);

// route for admin to access all the users
userRoute.route("/").get(authController.protect, userController.getUsers);

module.exports = userRoute;
