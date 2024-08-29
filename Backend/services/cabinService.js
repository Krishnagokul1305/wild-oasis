const cabinModel = require("../models/cabinModel");
const catchServiceError = require("../utils/asyncServiceErrorHandler");
const AppError = require("../utils/AppError"); // Ensure you have this import

exports.getAllCabins = catchServiceError(async () => {
  const cabins = await cabinModel.find();
  return cabins;
});

exports.getCabinById = catchServiceError(async (id) => {
  const cabin = await cabinModel.findById(id);

  if (!cabin) {
    throw new AppError("No cabin found with the provided id", 404);
  }

  return cabin;
});

exports.createCabin = catchServiceError(async (cabinData) => {
  const { name, maxCapacity, regularPrice, description, image } = cabinData;

  if (!name || !maxCapacity || !regularPrice || !description || !image) {
    throw new AppError("Please fill all the required fields", 400);
  }

  const newCabin = await cabinModel.create(cabinData);
  return newCabin;
});

exports.updateCabin = catchServiceError(async ({ id, data }) => {
  const updatedCabin = await cabinModel.findByIdAndUpdate(id, data, {
    runValidators: true,
    new: true,
  });

  if (!updatedCabin) {
    throw new AppError("No cabin found with the provided id", 404);
  }

  return updatedCabin;
});

exports.deleteCabin = catchServiceError(async (id) => {
  const cabin = await cabinModel.findByIdAndDelete(id);

  if (!cabin) {
    throw new AppError("No cabin found with the provided id", 404);
  }
});
