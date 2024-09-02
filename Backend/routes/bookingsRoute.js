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
} = require("../controllers/bookingsController");

const bookingsRoute = express.Router();

// bookingsRoute.use(isAuthenticated);
bookingsRoute.route("/").get(getAllBookings).post(createBookings);

bookingsRoute.route("/todayActivities").get(todayActivities);

bookingsRoute.route("/7Days-bookings").get(recentBookings)

bookingsRoute
  .route("/:id")
  .get(getBooking)
  .patch(updateBooking)
  .delete(deleteBooking);

// all BOOKINGS that are were created after the given date
//all STAYS that are were created after the given date
// getStaysTodayActivity Activity means that there is a check in or a check out today

// bookingsRoute.route("/getBookingsAfterDate").get();
// bookingsRoute.route("/getStaysAfterDate").get();

bookingsRoute.route("/check-in/:id").patch(checkIn);
bookingsRoute.route("/check-out/:id").patch(checkOut);

module.exports = bookingsRoute;
