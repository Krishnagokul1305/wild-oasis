const cabinModel = require("../models/cabinModel");
const bookingsModel = require("../models/bookingsModel");
const catchServiceError = require("../utils/asyncServiceErrorHandler");
const { getSettings } = require("./settingsService");

exports.createBookings = catchServiceError(async (bookingDetails) => {
  const settings = await getSettings();
  if (bookingDetails.numGuests > settings.maxGuestPerBooking) {
    throw new Error(`maximum guest : ${settings.maxGuestPerBooking}`);
  }
  if (bookingDetails.numNights > settings.maxBookingLength) {
    throw new Error(
      `user can only book cabins for maximum ${settings.maxBookingLength} nights`
    );
  }
  if (bookingDetails.numNights < settings.minBookingLength) {
    throw new Error(
      `user should book cabins for minimum ${settings.maxBookingLength} nights`
    );
  }
  if (bookingDetails.hasBreakfast) {
    bookingDetails.extraPrice = settings.breakFastPrice;
    bookingDetails.totalPrice += bookingDetails.extraPrice;
  }

  if (!(await cabinModel.findById(bookingDetails.cabin))) {
    throw new Error("Invalid cabin Id");
  }

  const newBooking = bookingsModel.create(bookingDetails);
  return newBooking;
});

exports.getAllBookings = catchServiceError(async () => {
  const bookings = await bookingsModel
    .find()
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

exports.checkIn = catchServiceError(async (bookingId) => {
  const booking = await bookingsModel.findById(bookingId);
  if (!booking) {
    throw new Error("Invalid Id");
  }
});

exports.checkOut = catchServiceError(async (bookingId) => {
  const booking = await bookingsModel.findById(bookingId);
  if (!booking) {
    throw new Error("Invalid Id");
  }
});
