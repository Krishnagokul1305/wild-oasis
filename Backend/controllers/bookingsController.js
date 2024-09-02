const bookingsService = require("../services/bookingsService");
const catchControllerError = require("../utils/asyncControllerError");

exports.getAllBookings = catchControllerError(async (req, res, next) => {
  const { bookings, totalBookings } = await bookingsService.getAllBookings(
    req.query
  );
  res.status(200).json({
    status: "success",
    results: totalBookings,
    data: bookings,
  });
});

exports.createBookings = catchControllerError(async (req, res, next) => {
  const bookingDetails = { ...req.body };
  const newBooking = await bookingsService.createBookings(bookingDetails);
  res.status(201).send({
    status: "success",
    data: newBooking,
  });
});

exports.checkIn = catchControllerError(async (req, res, next) => {
  const { id } = req.params;
  const checkedBooking = await bookingsService.checkIn({
    bookingId: id,
    data: req.body,
  });
  res.status(200).send({
    status: "success",
    data: checkedBooking,
  });
});

exports.checkOut = catchControllerError(async (req, res, next) => {
  const { id } = req.params;
  const checkedBooking = await bookingsService.checkOut(id);
  res.status(200).send({
    status: "success",
    data: checkedBooking,
  });
});

exports.getBooking = catchControllerError(async (req, res, next) => {
  const { id } = req.params;
  const booking = await bookingsService.getBookingById(id);
  res.status(200).send({
    status: "success",
    data: booking,
  });
});

exports.todayActivities = catchControllerError(async (req, res, next) => {
  const todayBookings = await bookingsService.getTodayActivities();
  res.status(200).send({
    status: "success",
    data: todayBookings,
  });
});

exports.recentBookings = catchControllerError(async (req, res, next) => {
  const data = await bookingsService.getBookingLast7Days();
  res.status(200).send({
    status: "success",
    results:data.length,
    data: data,
  });
});

exports.updateBooking = catchControllerError(async (req, res, next) => {
  const { id } = req.params;
  const updatedBooking = await bookingsService.updateBooking({
    id,
    updateData: req.body,
  });
  res.status(200).send({
    status: "success",
    data: updatedBooking,
  });
});

exports.deleteBooking = catchControllerError(async (req, res, next) => {
  const { id } = req.params;
  await bookingsService.deleteBooking(id);
  res.status(204).send({
    status: "success",
  });
});
