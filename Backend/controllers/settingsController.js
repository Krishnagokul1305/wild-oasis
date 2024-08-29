const settingsService = require("../services/settingsService");
const catchControllerError = require("../utils/asyncControllerError");

exports.getSettings = catchControllerError(async (req, res, next) => {
  const settings = await settingsService.getSettings();
  res.status(200).json({
    status: "success",
    data: settings,
  });
});

exports.updateSettings = catchControllerError(async (req, res, next) => {
  const settings = await settingsService.updateSettings(req.body);
  res.status(201).json({
    status: "success",
    data: settings,
  });
});
