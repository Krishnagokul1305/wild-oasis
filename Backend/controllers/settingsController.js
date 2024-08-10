const settingsService = require("../services/settingsService");

exports.getSettings = async (req, res, next) => {
  try {
    const settings = await settingsService.getSettings();
    res.status(200).json({
      status: "success",
      data: settings,
    });
  } catch (error) {
    res.status(500).send({ error: `Error : ${error.message}` });
  }
};

exports.updateSettings = async (req, res, next) => {
  try {
    const settings = await settingsService.updateSettings(req.body);
    res.status(201).json({
      status: "success",
      data: settings,
    });
  } catch (error) {
    res.status(500).send({ error: `Error : ${error.message}` });
  }
};
