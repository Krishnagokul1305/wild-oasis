const mongoose = require("mongoose");

const bookingsSchema = mongoose.Schema(
  {
    startDate: {
      type: Date,
      required: [true, "Booking must have a start date"],
    },
    endDate: {
      type: Date,
      required: [true, "Booking must have an end date"],
    },
    numNights: {
      type: Number,
      required: [true, "Booking must have a number of nights"],
    },
    numGuests: {
      type: Number,
      required: [true, "Booking must have a number of guests"],
    },
    cabinPrice: {
      type: Number,
      required: [true, "Booking must have a cabin price"],
    },
    extraPrice: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: [true, "Booking must have a total price"],
    },
    status: {
      type: String,
      enum: ["unConfirmed", "checked-in", "checked-out"],
      default: "unConfirmed",
    },
    hasBreakFast: {
      type: Boolean,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    observations: {
      type: String,
      default: "",
    },
    cabin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cabin",
      required: [true, "Booking must be associated with a cabin"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Booking must be associated with a user"],
    },
  },
  {
    timestamps: true,
  }
);

const bookingsModel = mongoose.model("Booking", bookingsSchema);

module.exports = bookingsModel;
