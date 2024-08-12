const cabinModel = require("../models/cabinModel");
const catchServiceError = require("../utils/asyncServiceErrorHandler");

exports.getAllCabins = catchServiceError(async () => {
  const cabins = await cabinModel.find();
  return cabins;
});

exports.getCabinById = catchServiceError(async (id) => {
  const cabin = await cabinModel.findById(id);
  return cabin;
});

exports.createCabin = catchServiceError(async (cabinData) => {
  const { name, maxCapacity, regularPrice, description, image } = cabinData;

  if (!name || !maxCapacity || !regularPrice || !description || !image) {
    throw new Error("please fill all the required fields");
  }

  const newCabin = await cabinModel.create(cabinData);
  return newCabin;
});

exports.updateCabin = async ({ id, data }) => {
  try {
    console.log(data);
    const updatedCabin = await cabinModel.findByIdAndUpdate(id, data, {
      runValidators: true,
      new: true,
    });
    if (!updatedCabin) throw new Error("no cabin found for the id");
    return updatedCabin;
  } catch (error) {
    throw new Error(error);
  }
};
exports.deleteCabin = catchServiceError(async (id) => {
  await cabinModel.findByIdAndDelete(id);
});
