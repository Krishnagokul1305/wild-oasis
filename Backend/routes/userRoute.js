const express = require("express");
const authController = require("../controllers/authController");

const userRoute = express.Router();

userRoute.route("/sign-up").post(authController.createUser);
userRoute.route("/login").post(authController.loginUser);

module.exports = userRoute;
