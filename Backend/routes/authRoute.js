const express = require("express");
const authController = require("../controllers/authController");

const authRoute = express.Router();

authRoute.route("/sign-up").post(authController.createUser);
authRoute.route("/login").post(authController.loginUser);
authRoute.route("/forgotPassword").post(authController.forgotPassword);

module.exports = authRoute;
