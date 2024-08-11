const mongoose = require("mongoose");
const { getSettings } = require("../services/settingsService");

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

// Centralized validation function
async function validateBooking(doc) {
  const settings = await getSettings();

  if (doc.numGuests > settings.maxGuestPerBooking) {
    throw new Error(`Maximum guests allowed: ${settings.maxGuestPerBooking}`);
  }

  if (doc.numNights > settings.maxBookingLength) {
    throw new Error(
      `Users can only book cabins for a maximum of ${settings.maxBookingLength} nights`
    );
  }

  if (doc.numNights < settings.minBookingLength) {
    throw new Error(
      `Users must book cabins for a minimum of ${settings.minBookingLength} nights`
    );
  }
}

// Pre-save middleware (for creating documents)
bookingsSchema.pre("save", async function (next) {
  try {
    await validateBooking(this);
    next();
  } catch (error) {
    next(error);
  }
});

// Pre-findOneAndUpdate middleware (for updating documents)
bookingsSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const update = this.getUpdate();
    const doc = {
      numGuests:
        update.numGuests !== undefined
          ? update.numGuests
          : this.getQuery().numGuests,
      numNights:
        update.numNights !== undefined
          ? update.numNights
          : this.getQuery().numNights,
    };

    await validateBooking(doc);
    next();
  } catch (error) {
    next(error);
  }
});

const bookingsModel = mongoose.model("Booking", bookingsSchema);

module.exports = bookingsModel;
