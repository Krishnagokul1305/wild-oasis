const bookingsService = require("../services/bookingsService");

exports.getAllBookings = async (req, res, next) => {
  try {
    const bookings = await bookingsService.getAllBookings();
    res.status(200).json({
      status: "success",
      results: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).send({ error: `Error : ${error.message}` });
  }
};

exports.createBookings = async (req, res, next) => {
  try {
    console.log(req.body);
    await bookingsService.createBookings();
    res.status(200).send({
      message: "nothing",
    });
  } catch (error) {
    res.status(500).send({ error: `Error : ${error.message}` });
  }
};
