const express = require("express");
const { isAuthenticated } = require("../middlewares/authentication");
const {
  getAllBookings,
  createBookings,
} = require("../controllers/bookingsController");

const bookingsRoute = express.Router();

bookingsRoute.use(isAuthenticated);
bookingsRoute.route("/").get(getAllBookings).post(createBookings);

bookingsRoute.route("/:id").get().patch().delete();

// all BOOKINGS that are were created after the given date
//all STAYS that are were created after the given date
// getStaysTodayActivity Activity means that there is a check in or a check out today
// bookingsRoute.route("/todayActivities").get();
// bookingsRoute.route("/getBookingsAfterDate").get();
// bookingsRoute.route("/getStaysAfterDate").get();

// bookingsRoute.route("/check-in/:id").patch();
// bookingsRoute.route("/check-out/:id").patch();

module.exports = bookingsRoute;
