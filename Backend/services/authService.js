const userModel = require("../models/userModel");
const catchServiceError = require("../utils/asyncServiceErrorHandler");
const validator = require("validator");

exports.signup = catchServiceError(async function (userData) {
  const { fullName, password, email, confirmPassword } = userData;
  if (!fullName) {
    throw new Error("fullName must be filled");
  }
  if (!password) {
    throw new Error("password must be filled");
  }
  if (!email && validator.isEmail(email)) {
    throw new Error("email must be filled");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }
  if (!confirmPassword) {
    throw new Error("confirmPassword must be filled");
  }
  const newUser = await userModel.create(userData);

  return newUser;
});

exports.login = catchServiceError(async function (userData) {
  const { email, password } = userData;
  if (!email) {
    throw new Error("email must be filled");
  }
  if (!password) {
    throw new Error("password must be filled");
  }

  const user = await userModel.findOne({ email }).select("+password");

  //   check if the user exists and the password is same as the password in db
  if (!user || !(await user.isValidPassword(password, user.password))) {
    throw new Error("Invaild email or password");
  }

  return user;
});

exports.forgotPassword = catchServiceError(async function (email) {});

exports.resetPassword = catchServiceError(async function (email) {});
