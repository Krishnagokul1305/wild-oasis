const userModel = require("../models/userModel");
const catchServiceError = require("../utils/asyncServiceErrorHandler");
const ApiFeatures = require("../utils/ApiFeatures");
const validator = require("validator");
const AppError = require("../utils/AppError"); // Ensure you have this import

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

exports.updateUserDetails = catchServiceError(async ({ id, updateData }) => {
  const updatedUser = await userModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    throw new AppError("No user found with the provided id", 404);
  }

  return updatedUser;
});

exports.updateUserPassword = catchServiceError(
  async ({ user, newPassword, currentPassword, confirmPassword }) => {
    if (!(await user.isValidPassword(currentPassword, user.password))) {
      throw new AppError("Invalid current password", 400);
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
    throw new AppError("No user found with the provided id", 404);
  }

  return user;
});
