const settingsModel = require("../models/settingsModel");
const bookingsModel = require("../models/bookingsModel");
const catchServiceError = require("../utils/asyncServiceErrorHandler");
const { getSettings } = require("./settingsService");

const createBookings = catchServiceError(async () => {
  const settings = await getSettings();
});

const getAllBookings = catchServiceError(async () => {});
