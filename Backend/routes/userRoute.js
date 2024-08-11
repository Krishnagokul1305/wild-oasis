const express = require("express");
const userController = require("../controllers/userController");
const {
  isAuthenticated,
  isAuthorized,
} = require("../middlewares/authentication");
const { uploads, resize } = require("../middlewares/imgUpload");

const userRoute = express.Router();

// route for only logged in users
userRoute.use(isAuthenticated);
userRoute
  .route("/updateUser")
  .patch(
    uploads.single("avatar"),
    resize("user"),
    userController.updateUserData
  );
userRoute.route("/updatePassword").patch(userController.updatePassword);

// route that can only accessed by the employees
// userRoute.use(isAuthorized("employee"));
userRoute
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createNewUser);
userRoute.route("/:id").get(userController.getUser);
module.exports = userRoute;
