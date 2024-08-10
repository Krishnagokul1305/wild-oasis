const settingsModel = require("../models/settingsModel");
const bookingsModel = require("../models/bookingsModel");
const catchServiceError = require("../utils/asyncServiceErrorHandler");
const { getSettings } = require("./settingsService");

exports.createBookings = catchServiceError(async () => {
  const settings = await getSettings();
  console.log(settings);
});

exports.getAllBookings = catchServiceError(async () => {
  const bookings = await bookingsModel.find();

  console.log(bookings);

  return bookings;
});
