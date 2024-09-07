const express = require("express");
const { isAuthenticated } = require("../middlewares/authentication");
const {
  getAllBookings,
  createBookings,
  checkIn,
  checkOut,
  getBooking,
  updateBooking,
  deleteBooking,
  todayActivities,
  recentBookings,
  getStaysLast7Days,
} = require("../controllers/bookingsController");

const bookingsRoute = express.Router();

// bookingsRoute.use(isAuthenticated);
bookingsRoute.route("/").get(getAllBookings).post(createBookings);

bookingsRoute.route("/todayActivities").get(todayActivities);

bookingsRoute.route("/7Days-bookings").get(recentBookings)

bookingsRoute.route("/StaysLast7Days").get(getStaysLast7Days)

bookingsRoute
  .route("/:id")
  .get(getBooking)
  .patch(updateBooking)
  .delete(deleteBooking);

bookingsRoute.route("/check-in/:id").patch(checkIn);
bookingsRoute.route("/check-out/:id").patch(checkOut);

module.exports = bookingsRoute;
