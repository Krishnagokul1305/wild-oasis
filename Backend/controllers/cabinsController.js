const cabinService = require("../services/cabinService");

exports.getCabins = async (req, res, next) => {
  try {
    const cabins = await cabinService.getAllCabins();
    res.status(200).json({
      status: "success",
      results: cabins.length,
      data: cabins,
    });
  } catch (error) {
    res.status(500).send({ error: `Error : ${error.message}` });
  }
};

exports.getSingleCabin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cabin = await cabinService.getCabinById(id);
    res.status(200).json({
      status: "success",
      data: cabin,
    });
  } catch (error) {
    res.status(500).send({ error: `Error : ${error.message}` });
  }
};

exports.postCabins = async (req, res, next) => {
  try {
    const cabin = await cabinService.createCabin(req.body);
    console.log(req.body);
    res.status(201).json({
      status: "success",
      data: cabin,
    });
  } catch (error) {
    res.status(500).send({ error: `Error : ${error.message}` });
  }
};

exports.deleteCabin = async (req, res, next) => {
  try {
    const { id } = req.params;
    await cabinService.deleteCabin(id);
    res.status(204).json({
      message: "no content",
    });
  } catch (error) {
    res.status(500).send({ error: `Error : ${error.message}` });
  }
};

exports.updateCabin = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.body);  
    const newCabin = await cabinService.updateCabin({ id, data: req.body });
    console.log(newCabin);
    res.status(200).json({
      status: "success",
      data: newCabin,
    });
  } catch (error) {
    res.status(500).send({ error: `Error : ${error.message}` });
  }
};
