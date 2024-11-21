const userModel = require("../models/userModel");
const catchServiceError = require("../utils/asyncServiceErrorHandler");
const validator = require("validator");
const crypto = require("crypto");
const AppError = require("../utils/AppError"); // Ensure you have this import

exports.signup = catchServiceError(async function (userData) {
  const { fullName, password, email, confirmPassword } = userData;

  if (!fullName) {
    throw new AppError("Full name must be filled", 400);
  }
  if (!password) {
    throw new AppError("Password must be filled", 400);
  }
  if (!email) {
    throw new AppError("Email must be filled", 400);
  }
  if (!validator.isEmail(email)) {
    throw new AppError("Invalid email format", 400);
  }
  if (!confirmPassword) {
    throw new AppError("Confirm password must be filled", 400);
  }

  const newUser = await userModel.create(userData);
  return newUser;
});

exports.login = catchServiceError(async function (userData) {
  const { email, password } = userData;

  if (!email) {
    throw new AppError("Email must be filled", 400);
  }
  // if (!password) {
  //   throw new AppError("Password must be filled", 400);
  // }

  const user = await userModel.findOne({ email });

  // Check if the user exists and the password matches the one in the database
  // if (!user || !(await user.isValidPassword(password, user.password))) {
  //   throw new AppError("Invalid email or password", 401);
  // }

  return user;
});

exports.forgotPassword = catchServiceError(async function (email) {
  if (!email) {
    throw new AppError("Please provide an email", 400);
  }

  const user = await userModel.findOne({ email });

  if (!user) {
    throw new AppError("No user found with that email", 404);
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  const encryptedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.passwordResetToken = encryptedToken;
  user.passwordExpireTime = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes

  await user.save({ validateBeforeSave: false });

  return resetToken;
});

exports.resetPassword = catchServiceError(async function ({
  resetToken,
  confirmPassword,
  newPassword,
}) {
  if (!resetToken) {
    throw new AppError("Please provide a reset token", 400);
  }

  const encryptedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await userModel.findOne({ passwordResetToken: encryptedToken });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  user.password = newPassword;
  user.confirmPassword = confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordExpireTime = undefined;

  await user.save();
});
