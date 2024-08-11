const userModel = require("../models/userModel");
const catchServiceError = require("../utils/asyncServiceErrorHandler");
const ApiFeatures = require("../utils/ApiFeatures");
const validator = require("validator");

exports.getAllUsers = catchServiceError(async (queryObj) => {
  let query = {};
  if (queryObj) {
    query = { ...queryObj };
  }

  const features = new ApiFeatures(userModel.find(), query)
    .filter()
    .sort()
    .page()
    .limit();

  const users = await features.query;
  return users;
});

exports.createUsers = catchServiceError(async (userData) => {
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

exports.updateUserDetails = catchServiceError(async ({ id, updateData }) => {
  const updatedUser = await userModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return updatedUser;
});

exports.updateUserPassword = catchServiceError(
  async ({ user, newPassword, currentPassword, confirmPassword }) => {
    if (!(await user.isValidPassword(currentPassword, user.password))) {
      throw new Error("Invalid currentPassword");
    }
    user.password = newPassword;
    user.confirmPassword = confirmPassword;
    const updatedUser = await user.save();
    return updatedUser;
  }
);

exports.getUserById = catchServiceError(async (id) => {
  const user = await userModel.findById(id);
  if (!user) {
    throw new Error("no user found");
  }
  return user;
});
