const userModel = require("../models/userModel");
const catchServiceError = require("../utils/asyncServiceErrorHandler");
const ApiFeatures = require("../utils/ApiFeatures");

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
