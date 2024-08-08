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
