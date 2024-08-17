const bookingsService = require("../services/bookingsService");

exports.getAllBookings = async (req, res, next) => {
  try {
    const { bookings, totalBookings } = await bookingsService.getAllBookings(
      req.query
    );
    res.status(200).json({
      status: "success",
      results: totalBookings,
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
    res.status(200).send({
      status: "success",
      data: checkedBooking,
    });
  } catch (error) {
    res.status(500).send({ error: `Error : ${error.message}` });
  }
};

exports.checkOut = async (req, res, next) => {
  try {
    const { id } = req.params;
    const checkedBooking = await bookingsService.checkOut(id);
    res.status(200).send({
      status: "success",
      data: checkedBooking,
    });
  } catch (error) {
    res.status(500).send({ error: `Error : ${error.message}` });
  }
};

exports.getBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await bookingsService.getBookingById(id);
    res.status(200).send({
      status: "success",
      data: booking,
    });
  } catch (error) {
    res.status(500).send({ error: `Error : ${error.message}` });
  }
};

exports.todayActivities = async (req, res, next) => {
  try {
    const todayBookings = await bookingsService.getTodayActivities();
    console.log(todayBookings);
    res.status(200).send({
      status: "success",
      data: todayBookings,
    });
  } catch (error) {
    res.status(500).send({ error: `Error : ${error.message}` });
  }
};

exports.updateBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedBooking = await bookingsService.updateBooking({
      id,
      updateData: req.body,
    });
    res.status(200).send({
      status: "success",
      data: updatedBooking,
    });
  } catch (error) {
    res.status(500).send({ error: `Error : ${error.message}` });
  }
};

exports.deleteBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    await bookingsService.deleteBooking(id);
    res.status(204).send({
      status: "success",
    });
  } catch (error) {
    res.status(500).send({ error: `Error : ${error.message}` });
  }
};
