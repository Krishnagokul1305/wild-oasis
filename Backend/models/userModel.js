const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "user must have a name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "user must have email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "email is invalid"],
  },
  photo: String,
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  password: {
    type: String,
    required: [true, "user must have a password"],
    minlength: 6,
  },
  confirmPassword: {
    type: String,
    validate: {
      validator: function (val) {
        return this.password === val;
      },
      message: "passwords does not match",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  passwordResetToken: String,
  tokenExpireTime: Date,
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
