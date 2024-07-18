const userModel = require("../models/userModel");
const catchAsync = require("../utils/asyncErrorHandler");
const ApiFeatures = require("../utils/ApiFeatures");

// these functionalities are only for admin
// function to get all users
exports.getUsers = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(userModel.find(), req.query)
    .filter()
    .limit()
    .page()
    .sort();

  const users = await features.query;

  res.status(200).json({
    status: "success",
    results: users.length,
    data: users,
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {});
exports.postUser = catchAsync(async (req, res, next) => {});
exports.updateUser = catchAsync(async (req, res, next) => {});
exports.deleteUser = catchAsync(async (req, res, next) => {});
