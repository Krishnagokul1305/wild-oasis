const express = require("express");


// important
// email sending part is still not completed 

const app = express();
const path = require("path");

// middlewares
const morgan = require("morgan");
const helmet = require("helmet"); //http headers setter
const xss = require("xss-clean"); // prevents htmls entering into db
const rateLimiter = require("express-rate-limit"); //limit rate of requests
const sanitizer = require("express-mongo-sanitize"); //prevents noSQL injections
const cors = require("cors");

app.use(cors());

// routes
const userRoute = require("./routes/userRoute");
const cabinRoute = require("./routes/cabinsRoute");
const bookingsRoute = require("./routes/bookingsRoute");
const settingsRoute = require("./routes/settingsRoute");
const authRoute = require("./routes/authRoute");
const errorController = require("./controllers/errorController");
const AppError = require("./utils/AppError");

// middleware to parse request body without this we cannot access request body
app.use(express.json());

// serving images
app.use("/api/v1/public", express.static(path.join(__dirname, "public")));

// middlewares for security
app.use(sanitizer()); //middleware for nosql injection prevention

app.use(xss());

app.use(helmet()); //security header setter

if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("dev"));
}

// router middleware
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/cabins", cabinRoute);
app.use("/api/v1/bookings", bookingsRoute);
app.use("/api/v1/settings", settingsRoute);

app.use("*", (req, res, next) => {
  next(new AppError("No routes found for the request", 404));
});


// global error handling middleware
app.use(errorController);
module.exports = app;
