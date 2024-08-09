const express = require("express");

const bookingsRoute = express.Router();

bookingsRoute.route("/").get().post();

bookingsRoute.route("/:id").get().patch();
