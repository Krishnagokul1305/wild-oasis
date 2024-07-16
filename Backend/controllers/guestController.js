const guestModel = require("../models/guestModel");
const catchAsync = require("../utils/asyncErrorHandler");
const AppError = require("../utils/AppError");
const ApiFeatures = require("../utils/ApiFeatures");

const getAllGuest = catchAsync(async (req, res, next) => {
  const Guests = await guestModel.find();
  res.status(200).json({
    status: "success",
    results: Guests.length,
    data: Guests,
  });
});
const getGuestById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const Guest = await guestModel.findById(id);
  if (!Guest) {
    return next(new AppError("please check the Id : Invalid guest id", 404));
  }
  res.status(200).json({
    status: "success",
    data: Guest,
  });
});
const postGuest = catchAsync(async (req, res, next) => {
  const newGuest = await guestModel.create(req.body);
  res.status(201).json({
    status: "success",
    data: newGuest,
  });
});

const updateGuest = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updatedGuest = await guestModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedGuest) {
    return next(new AppError("no data found for the id : Invalid ID!", 404));
  }

  res.status(200).json({
    status: "success",
    data: updatedGuest,
  });
});

const deleteGuest = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await guestModel.findByIdAndDelete(id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  getAllGuest,
  getGuestById,
  postGuest,
  updateGuest,
  deleteGuest,
};
