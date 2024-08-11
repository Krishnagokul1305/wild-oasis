const cabinModel = require("../models/cabinModel");
const bookingsModel = require("../models/bookingsModel");
const catchServiceError = require("../utils/asyncServiceErrorHandler");
const { getSettings } = require("./settingsService");
const ApiFeatures = require("../utils/ApiFeatures");

exports.getAllBookings = catchServiceError(async (queryObj) => {
  let query = {};
  if (queryObj) {
    query = { ...queryObj };
  }

  const features = new ApiFeatures(bookingsModel.find(), query)
    .filter()
    .sort()
    .page()
    .limit();

  const bookings = await features.query
    .populate({
      path: "user",
      select: "email fullName -_id",
    })
    .populate({
      path: "cabin",
      select: "name -_id",
    });

  return bookings;
});

exports.createBookings = catchServiceError(async (bookingDetails) => {
  if (!(await cabinModel.findById(bookingDetails.cabin))) {
    throw new Error("Invalid cabin Id");
  }

  const newBooking = bookingsModel.create(bookingDetails);
  return newBooking;
});

exports.checkIn = catchServiceError(async (bookingId) => {
  const booking = await bookingsModel.findById(bookingId);

  if (!booking) {
    throw new Error("Invalid booking Id");
  }

  if (booking.status == "checked-in") {
    throw new Error("Invalid Operation : Booking already checked-in");
  }

  if (booking.status == "checked-out") {
    throw new Error(" Booking is not eligible for check-in ");
  }

  booking.status = "checked-in";
  const checkedBooking = await booking.save();

  return checkedBooking;
});

exports.checkOut = catchServiceError(async (bookingId) => {
  const booking = await bookingsModel.findById(bookingId);

  if (!booking) {
    throw new Error("Invalid booking Id");
  }

  if (booking.status == "unconfirmed") {
    throw new Error(" Booking is not eligible for check-out");
  }

  if (booking.status == "checked-out") {
    throw new Error(" Invalid Operation : Booking already checked-out ");
  }

  booking.status = "checked-out";
  const checkedBooking = await booking.save();

  return checkedBooking;
});

exports.getBookingById = catchServiceError(async (bookingId) => {
  const booking = await bookingsModel.findById(bookingId);

  if (!booking) {
    throw new Error("Invalid Id : no booking found for the id");
  }
  return booking;
});

exports.getTodayActivities = catchServiceError(async () => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const todayBookings = await bookingsModel.find({
    updatedAt: { $gte: startOfToday, $lte: endOfToday }, // Updated today
    $or: [
      {
        status: "checked-in",
        startDate: { $gte: startOfToday, $lte: endOfToday },
      },
      {
        status: "checked-out",
        endDate: { $gte: startOfToday, $lte: endOfToday },
      },
    ],
  });

  return todayBookings;
});

exports.updateBooking = catchServiceError(
  async ({ id: bookingId, updateData }) => {
    if (updateData.status) {
      throw new Error("Invalid Operation : status updating");
    }

    const updatedBooking = await bookingsModel.findByIdAndUpdate(
      bookingId,
      updateData,
      {
        runValidators: true,
        new: true,
      }
    );

    if (!updatedBooking) {
      throw new Error("Invalid Id : no booking found for the id");
    }

    return updatedBooking;
  }
);

exports.deleteBooking = catchServiceError(async (bookingId) => {
  await bookingsModel.findByIdAndDelete(bookingId);
});
