const mongoose = require("mongoose");

const settingsSchema = mongoose.Schema(
  {
    // here the booking length does not mean booking
    // it mean how many nights stay
    maxBookingLength: {
      type: Number,
      required: true,
    },
    minBookingLength: {
      type: Number,
      required: true,
      validate: {
        validator: function (val) {
          // this.maxbookingsLength is undefined in update operations
          // this.getUpdate().$set.maxBookingLength using this because while using finoneandupdate
          //  wedont get access to full document getupdategives the update ones
          return (
            val <
            (this.maxBookingLength || this.getUpdate().$set.maxBookingLength)
          );
        },
        message: "minBookingLength must be less than maxBookingLength",
      },
    },
    maxGuestPerBooking: {
      type: Number,
      required: true,
    },
    breakFastPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const settingsModel = mongoose.model("settings", settingsSchema);

module.exports = settingsModel;
