const userModel = require("../models/userModel");
const catchServiceError = require("../utils/asyncServiceErrorHandler");
const validator = require("validator");
const crypto = require("crypto");

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

exports.forgotPassword = catchServiceError(async function (email) {
  if (!email) {
    throw new Error("please provide email");
  }
  const user = await userModel.findOne({ email });

  if (!user) {
    throw new Error("no user found");
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  const encryptedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.passwordResetToken = encryptedToken;
  user.passwordExpireTime = Date.now() + 10 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  return resetToken;
});

exports.resetPassword = catchServiceError(async function (email) {
  // get the token that is sent as a param in the url 

  // the token is encrypted in the db so encrypt the token 

  // search for the user with the token in the db

  // if user exists save the document with new password with save method to enable validation
});
