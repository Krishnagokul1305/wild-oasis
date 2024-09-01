const userModel = require("../models/userModel");
const { decodeToken } = require("../utils/jwtProvider");
const AppError = require("../utils/AppError");
const controllerError = require("../utils/asyncControllerError");

exports.isAuthenticated = controllerError(async (req, res, next) => {
  // Check if there is a token
  if (!req.headers.authorization || !req.headers.authorization.split(" ")[1]) {
    throw new AppError("Please provide an authorization token", 400);
  }

  // Verify the token
  const token = req.headers.authorization.split(" ")[1];
  console.log(token)
  const decoded = decodeToken(token);

  if (!decoded) {
    throw new AppError("Invalid token", 400);
  }

  // Get the user from the database
  const user = await userModel.findById(decoded.id).select("+password");
  if (!user) {
    throw new AppError("No user found with this token", 404);
  }

  // Check if the user changed the password after the token was created
  if (user.hasChangedPassword(decoded.iat)) {
    throw new AppError(
      "User recently changed the password. Please login again!",
      401
    );
  }

  req.user = user;
  next();
});

exports.isAuthorized =
  (...authRoles) =>
  (req, res, next) => {
    if (!authRoles.includes(req.user.role)) {
      throw new AppError("You are not authorized to access this route", 403);
    }

    next();
  };
