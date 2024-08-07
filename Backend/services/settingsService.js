const settingsModel = require("../models/settingsModel");
const catchServiceError = require("../utils/asyncServiceErrorHandler");

exports.getSettings = catchServiceError(async () => {
  const settings = await settingsModel.findOne();
  return settings;
});

exports.updateSettings = catchServiceError(async (data) => {
  console.log(data);
  const updatedSettings = await settingsModel.findOneAndUpdate({}, data, {
    new: true,
    runValidators: true,
  });
  return updatedSettings;
});
