const express = require("express");
const cabinRoute = express.Router();

// controller functions
const {
  getAllCabin,
  getCabinByName,
  postCabin,
  updateCabin,
  deleteCabin,
} = require("../controllers/cabinController");

// routes
cabinRoute.route("/").get(getAllCabin).post(postCabin);
cabinRoute
  .route("/:id")
  .get(getCabinByName)
  .patch(updateCabin)
  .delete(deleteCabin);

module.exports = cabinRoute;
