const bookingModel = require("../models/BookingsModel");
const catchAsync = require("../utils/asyncErrorHandler");
const AppError = require("../utils/AppError");

const getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await bookingModel.find();
  res.status(200).json({
    status: "success",
    results: bookings.length,
    data: bookings,
  });
});

const getBookingsById = catchAsync(async (req, res, next) => {
  const bookings = await bookingModel.findById(req.params.id);
  if (!bookings) {
    return next(new AppError("No booking found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: bookings,
  });
});

const getBookingStats = catchAsync(async (req, res, next) => {
  const bookingsStats = await bookingModel.aggregate([
    {
      $group: {
        _id: "$status",
        totalBookings: { $sum: 1 },
        paidBookings: {
          $sum: { $cond: [{ $eq: ["$isPaid", true] }, 1, 0] },
        },
        pendingPaymentBookings: {
          $sum: { $cond: [{ $eq: ["$isPaid", false] }, 1, 0] },
        },
      },
    },
    {
      $project: {
        _id: 0,
        status: "$_id",
        totalBookings: 1,
        paymentStatus: 1,
        paymentStatus: {
          paid: "$paidBookings",
          pendingPayment: "$pendingPaymentBookings",
        },
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    data: bookingsStats,
  });
});
const postBookings = catchAsync(async (req, res, next) => {
  const newBooking = await bookingModel.create(req.body);
  res.status(201).json({
    status: "success",
    data: newBooking,
  });
});

const updateBookings = catchAsync(async (req, res, next) => {
  const updatedBooking = await bookingModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runvalidators: true,
    }
  );
  if (!updatedBooking) {
    return next(new AppError("No booking found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: updatedBooking,
  });
});

const deleteBookings = catchAsync(async (req, res, next) => {
  await bookingModel.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  getAllBookings,
  getBookingsById,
  getBookingStats,
  postBookings,
  updateBookings,
  deleteBookings,
};
