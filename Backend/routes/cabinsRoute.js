const express = require("express");
const cabinsController = require("../controllers/cabinsController");
const { uploads, resize } = require("../middlewares/imgUpload");
const cabinRoute = express.Router();

cabinRoute
  .route("/")
  .get(cabinsController.getCabins)
  .post(uploads.single("image"), resize("cabin"), cabinsController.postCabins);
cabinRoute
  .route("/:id")
  .get(cabinsController.getSingleCabin)
  .patch(uploads.single("image"), resize("cabin"), cabinsController.updateCabin)
  .delete(cabinsController.deleteCabin);

module.exports = cabinRoute;
