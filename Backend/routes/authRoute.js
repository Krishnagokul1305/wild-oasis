const express = require("express");
const authController = require("../controllers/authController");

const authRoute = express.Router();

authRoute.route("/sign-up").post(authController.signup);
authRoute.route("/login").post(authController.loginUser);
authRoute.route("/forgotPassword").post(authController.forgotPassword);
authRoute
  .route("/resetPassword/:resetToken")
  .post(authController.resetPassword);

module.exports = authRoute;
