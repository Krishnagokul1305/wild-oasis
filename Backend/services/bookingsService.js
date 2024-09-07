const cabinModel = require("../models/cabinModel");
const bookingsModel = require("../models/bookingsModel");
const catchServiceError = require("../utils/asyncServiceErrorHandler");
const { getSettings } = require("./settingsService");
const ApiFeatures = require("../utils/ApiFeatures");
const AppError = require("../utils/AppError"); // Ensure you have this import

exports.getAllBookings = catchServiceError(async (queryObj) => {
  let query = {};
  if (queryObj) {
    query = { ...queryObj };
  }

  const features = new ApiFeatures(bookingsModel.find(), query)
    .filter()
    .sort()
    .page()
    .limit();

  const bookings = await features.query
    .populate({
      path: "user",
      select: "email fullName -_id",
    })
    .populate({
      path: "cabin",
      select: "name -_id",
    });

  const totalBookings = await bookingsModel.countDocuments();

  return { bookings, totalBookings };
});

exports.createBookings = catchServiceError(async (bookingDetails) => {
  if (!(await cabinModel.findById(bookingDetails.cabin))) {
    throw new AppError("Invalid cabin Id", 400);
  }

  const newBooking = bookingsModel.create(bookingDetails);
  return newBooking;
});

exports.checkIn = catchServiceError(async ({ bookingId, data }) => {
  const booking = await bookingsModel.findById(bookingId);

  if (!booking) {
    throw new AppError("Invalid booking Id", 404);
  }

  if (booking.status == "checked-in") {
    throw new AppError("Invalid Operation: Booking already checked-in", 400);
  }

  if (booking.status == "checked-out") {
    throw new AppError("Booking is not eligible for check-in", 400);
  }

  if (!booking.isPaid && !data?.isPaid) {
    throw new AppError("Booking must be paid before checking in", 400);
  }

  booking.status = "checked-in";

  if (!booking.isPaid) booking.isPaid = true;
  if (!booking.hasBreakFast || data.hasBreakFast) {
    booking.extraPrice = data.extraPrice;
    booking.totalPrice = data.totalPrice;
  }

  booking.checkIn = new Date(Date.now()).toISOString();

  const checkedBooking = await booking.save();

  return checkedBooking;
});

exports.checkOut = catchServiceError(async (bookingId) => {
  const booking = await bookingsModel.findById(bookingId);

  if (!booking) {
    throw new AppError("Invalid booking Id", 404);
  }

  if (booking.status == "unconfirmed") {
    throw new AppError("Booking is not eligible for check-out", 400);
  }

  if (booking.status == "checked-out") {
    throw new AppError("Invalid Operation: Booking already checked-out", 400);
  }

  booking.status = "checked-out";
  booking.checkOut = new Date(Date.now()).toISOString();
  const checkedBooking = await booking.save();

  return checkedBooking;
});

exports.getBookingById = catchServiceError(async (bookingId) => {
  const booking = await bookingsModel
    .findById(bookingId)
    .populate({
      path: "user",
      select: "email fullName -_id",
    })
    .populate({
      path: "cabin",
      select: "name -_id",
    });

  if (!booking) {
    throw new AppError("Invalid Id: no booking found for the id", 404);
  }
  return booking;
});

exports.getTodayActivities = catchServiceError(async () => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const todayBookings = await bookingsModel
    .find({
      $or: [
        {
          status: "checked-in",
          startDate: { $gte: startOfToday, $lte: endOfToday },
        },
        {
          status: "checked-out",
          endDate: { $gte: startOfToday, $lte: endOfToday },
        },
      ],
    })
    .limit(4)
    .populate({
      path: "cabin",
      select: "name",
    })
    .populate({
      path: "user",
      select: "fullName",
    });

  return todayBookings;
});

exports.getBookingLast7Days = catchServiceError(async () => {
  const date = new Date();
  date.setDate(date.getDate() - 150);

  const bookingStats = await bookingsModel.aggregate([
    {
      $match: {
        createdAt: { $gte: date },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
        totalSales: { $sum: "$totalPrice" },
        extrasSales: { $sum: "$extraPrice" },
        numBookings: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        totalSales: 1,
        extrasSales: 1,
        numBookings: 1,
      },
    },
    {
      $sort: { date: 1 },
    },
  ]);

  return bookingStats;
});

exports.getStaysLast7Days = catchServiceError(async () => {
  const date = new Date();

  date.setDate(date.getDate() - 7);

  const bookingStats = await bookingsModel
    .find({
      checkIn: { $gte: date },
    })
    .populate({
      path: "user",
      select: "fullName -_id",
    });

  return bookingStats;
});

exports.updateBooking = catchServiceError(
  async ({ id: bookingId, updateData }) => {
    if (updateData.status) {
      throw new AppError("Invalid Operation: status updating", 400);
    }

    const updatedBooking = await bookingsModel.findByIdAndUpdate(
      bookingId,
      updateData,
      {
        runValidators: true,
        new: true,
      }
    );

    if (!updatedBooking) {
      throw new AppError("Invalid Id: no booking found for the id", 404);
    }

    return updatedBooking;
  }
);

exports.deleteBooking = catchServiceError(async (bookingId) => {
  await bookingsModel.findByIdAndDelete(bookingId);
});
