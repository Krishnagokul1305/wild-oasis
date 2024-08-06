const mongoose = require("mongoose");

const cabinSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "a cabin must have name"],
      unique: true,
    },
    maxCapacity: {
      type: Number,
      required: [true, "a cabin must have max capacity"],
    },
    regularPrice: {
      type: Number,
      required: [true, "a cabin must have price"],
    },
    discount: {
      type: Number,
      validator: {
        validate: (val) => {
          return this.regularPrice > val;
        },
        message: "discount price must be less than regular price",
      },
    },
    description: {
      type: String,
      required: [true, "a cabin must have description"],
    },
    image: {
      type: String,
      required: [true, "a cabin must have image"],
    },
  },
  {
    timestamps: true,
  }
);

const cabinModel = mongoose.model("cabin", cabinSchema);

module.exports = cabinModel;
