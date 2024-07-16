const cabinModel = require("../models/cabinModel");
const catchAsync = require("../utils/asyncErrorHandler");
const AppError = require("../utils/AppError");
const ApiFeatures = require("../utils/ApiFeatures");

//   function to get all cabins user must be logged in to access these routes
const getAllCabin = catchAsync(async (req, res, next) => {
  const query = req.query;

  const features = new ApiFeatures(cabinModel.find(), query)
    .filter()
    .sort()
    .limit()
    .page();

  const cabins = await features.query;
  res.status(200).json({
    status: "success",
    results: cabins.length,
    data: cabins,
  });
});

//   function to get cabin by id
const getCabinByName = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const newCabin = await cabinModel.findById(id);
  if (!newCabin)
    return next(new AppError("no data found for the id : Invalid ID!", 404));
  res.status(200).json({
    status: "success",
    data: newCabin,
  });
});

// function to post cabins
const postCabin = catchAsync(async (req, res, next) => {
  const {
    name,
    maxCapacity,
    price,
    image,
    description,
    discount = 0,
  } = req.body;

  if (!name || !maxCapacity || !price || !image || !description) {
    return next(new AppError("Please fill all the fields"));
  }
  const cabin = await cabinModel.create({
    name,
    maxCapacity,
    price,
    image,
    description,
    discount,
  });

  res.status(201).json({
    status: "success",
    data: cabin,
  });
});

// function to update the cabin by id
const updateCabin = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updatedCabin = await cabinModel.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });

  if (!updatedCabin) {
    return next(new AppError("no data found for the id : Invalid ID!", 404));
  }

  res.status(201).json({
    status: "success",
    data: updatedCabin,
  });
});

// function to delete cabin
const deleteCabin = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await cabinModel.findByIdAndDelete(id);
  res.status(204).json({
    status: "no content",
  });
});

module.exports = {
  getAllCabin,
  getCabinByName,
  postCabin,
  updateCabin,
  deleteCabin,
};
