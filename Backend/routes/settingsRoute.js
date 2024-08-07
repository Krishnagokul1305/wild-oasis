const express = require("express");
const {
  getSettings,
  updateSettings,
} = require("../controllers/settingsController");

const settingsRoute = express.Router();

settingsRoute.route("/").get(getSettings).post(updateSettings);

module.exports = settingsRoute;
