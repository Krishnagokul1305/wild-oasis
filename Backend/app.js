const express = require("express");

const app = express();

// middlewares
const morgan = require("morgan");
const helmet = require("helmet"); //http headers setter
const xss = require("xss-clean"); // prevents htmls entering into db
const rateLimiter = require("express-rate-limit"); //limit rate of requests
const sanitizer = require("express-mongo-sanitize"); //prevents noSQL injections

// routes
const userRoute = require("./routes/userRoute");
const cabinRoute = require("./routes/cabinRoute");
const bookingsRoute = require("./routes/BookingsRoute");
const guestRoute = require("./routes/guestRoute");
const settingsRoute = require("./routes/settingsRoute");

// middleware to parse request body without this we cannot access request body
app.use(express.json());

// middlewares for security
app.use(sanitizer()); //middleware for nosql injection prevention

app.use(xss());

app.use(helmet()); //security header setter

if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("dev"));
}

// router middleware
app.use("/api/v1/users", userRoute);
app.use("/api/v1/cabins", cabinRoute);
app.use("/api/v1/bookings", bookingsRoute);
app.use("/api/v1/guests", guestRoute);
app.use("/api/v1/settings", settingsRoute);

module.exports = app;
