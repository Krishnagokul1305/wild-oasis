const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const {
  isAuthenticated,
  isAuthorized,
} = require("../middlewares/authentication");

const userRoute = express.Router();

userRoute.route("/sign-up").post(authController.createUser);
userRoute.route("/login").post(authController.loginUser);

userRoute.use(isAuthenticated, isAuthorized("employee"));
userRoute.route("/").get(userController.getAllUsers);
module.exports = userRoute;
