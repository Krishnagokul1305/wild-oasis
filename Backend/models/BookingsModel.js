const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  cabin: {
    type: mongoose.Schema.ObjectId,
    ref: "cabins",
    required: true, // Cabin is required
  },
  guest: {
    type: mongoose.Schema.ObjectId,
    ref: "guests",
    required: true, // Guest is required
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true, // Cannot be changed once set
  },
  startDate: {
    type: Date,
    required: true, // Start date is required
    validate: {
      validator: function (value) {
        return value >= this.createdAt; // Start date should not be before the created date
      },
      message: "Start date must be after the booking creation date.",
    },
  },
  endDate: {
    type: Date,
    required: true, // End date is required
    validate: {
      validator: function (value) {
        return value > this.startDate; // End date should be after the start date
      },
      message: "End date must be after the start date.",
    },
  },
  numGuests: {
    type: Number,
    min: [1, "Number of guests must be at least 1."], // Minimum number of guests is 1
    required: true, // Number of guests is required
  },
  cabinPrice: {
    type: Number,
    required: true, // Cabin price is required
    min: [0, "Cabin price must be a positive number."], // Cabin price must be positive
  },
  extraPrice: {
    type: Number,
    default: 0, // Default extra price is 0
    min: [0, "Extra price must be a positive number."], // Extra price must be positive
  },
  totalPrice: {
    type: Number,
    required: true, // Total price is required
    min: [0, "Total price must be a positive number."], // Total price must be positive
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"], // Allowed values for status
    default: "pending",
  },
  isPaid: {
    type: Boolean,
    default: false, // Default isPaid is false
  },
  observations: {
    type: String,
    trim: true, // Trim whitespace from observations
  },
  hasBreakfast: {
    type: Boolean,
    default: false, // Default hasBreakfast is false
  },
});

const bookingModel = mongoose.model("bookings", bookingSchema);

module.exports = bookingModel;
