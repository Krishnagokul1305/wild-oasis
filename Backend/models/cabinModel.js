const mongoose = require("mongoose");

const cabinSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Cabin must have a name"],
    trim: true,
    unique: true,
  },
  maxCapacity: {
    type: Number,
    required: [true, "Cabin must have max capacity"],
    min: [1, "Max capacity must be at least 1"],
  },
  price: {
    type: Number,
    required: [true, "Cabin must have a price"],
    min: [0, "Price must be a positive number"],
  },
  discount: {
    type: Number,
    default: 0,
    validate: {
      validator: function (val) {
        return val >= 0 && val < this.price;
      },
      message: "Discount must be a positive number and less than the price",
    },
  },
  image: {
    type: String,
    required: [true, "Cabin must have an image"],
  },
  description: {
    type: String,
    required: [true, "Cabin must have a description"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const cabinModel = mongoose.model("Cabin", cabinSchema);

module.exports = cabinModel;
