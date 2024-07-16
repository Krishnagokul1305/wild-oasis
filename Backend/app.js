const express = require("express");

const app = express();

const AppError = require("./utils/AppError");
const errorController = require("./controllers/errorController");
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

// middleware to parse request body without this we cannot access request body
app.use(express.json());

// middlewares for security
app.use(sanitizer());

app.use(xss());

app.use(helmet());

const limiter = rateLimiter({
  max: process.env.REQUEST_LIMIT || 100,
  windowMs: process.env.REQUEST_TIMEOUT || 1000 * 60 * 60,
  message: "Too many requests  try after an hour",
});
app.use(limiter);

if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("dev"));
}

// router middleware
app.use("/api/v1/user", userRoute);
app.use("/api/v1/cabins", cabinRoute);
app.use("/api/v1/bookings", bookingsRoute);
app.use("/api/v1/guests", guestRoute);

// page not found route
app.all("*", (req, res, next) => {
  next(
    new AppError(
      `page not found for the request ${req.baseUrl} on this server`,
      404
    )
  );
});

// global error handling middleware
app.use(errorController);

module.exports = app;
