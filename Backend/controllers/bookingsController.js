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
    const bookingDetails = { ...req.body };
    console.log(bookingDetails);
    const newBooking = await bookingsService.createBookings(bookingDetails);
    console.log(newBooking);
    res.status(201).send({
      status: "success",
      data: newBooking,
    });
  } catch (error) {
    res.status(500).send({ error: `Error : ${error.message}` });
  }
};

exports.checkIn = async (req, res, next) => {
  try {
    const { id } = req.params;
    const checkedBooking = await bookingsService.checkIn(id);
  } catch (error) {
    res.status(500).send({ error: `Error : ${error.message}` });
  }
};

exports.checkIn = async (req, res, next) => {
  try {
    const { id } = req.params;
    const checkedBooking = await bookingsService.checkOut(id);
  } catch (error) {
    res.status(500).send({ error: `Error : ${error.message}` });
  }
};
