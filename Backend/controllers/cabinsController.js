const cabinService = require("../services/cabinService");
const catchControllerError = require("../utils/asyncControllerError");

exports.getCabins = catchControllerError(async (req, res, next) => {
  const cabins = await cabinService.getAllCabins();
  res.status(200).json({
    status: "success",
    results: cabins.length,
    data: cabins,
  });
});

exports.getSingleCabin = catchControllerError(async (req, res, next) => {
  const { id } = req.params;
  const cabin = await cabinService.getCabinById(id);
  res.status(200).json({
    status: "success",
    data: cabin,
  });
});

exports.postCabins = catchControllerError(async (req, res, next) => {
  const cabin = await cabinService.createCabin(req.body);
  res.status(201).json({
    status: "success",
    data: cabin,
  });
});

exports.deleteCabin = catchControllerError(async (req, res, next) => {
  const { id } = req.params;
  await cabinService.deleteCabin(id);
  res.status(204).json({
    message: "no content",
  });
});

exports.updateCabin = catchControllerError(async (req, res, next) => {
  const { id } = req.params;
  const newCabin = await cabinService.updateCabin({ id, data: req.body });
  res.status(200).json({
    status: "success",
    data: newCabin,
  });
});
