const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = mongoose.Schema(
  {
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
      minlength: 8,
      select: false,
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
    passwordResetToken: String,
    tokenExpireTime: Date,
    passwordChangedAt: Date,
  },
  {
    timestamps: true,
  }
);

// encrypt password before saving
userSchema.pre("save", async function (next) {
  console.log("save middleware is working ");
  if (!this.isModified("password")) next();

  const encryptedPassword = await bcrypt.hash(this.password, 12);
  this.password = encryptedPassword;
  this.confirmPassword = undefined;
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// method to check if the password is changed after the token is issued
userSchema.methods.isPasswordChanged = function (tokenInitiatedTime) {
  if (!this.passwordChangedAt) return false;

  const dbUpdatedTime = new Date(this.passwordChangedAt).getTime();
  return tokenInitiatedTime * 1000 <= dbUpdatedTime;
};

// compare password during login
userSchema.methods.comparePasswords = async function (reqPassword) {
  return await bcrypt.compare(reqPassword, this.password);
};

// Instance method to create password reset token
userSchema.methods.createPasswordToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.tokenExpireTime = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes

  return resetToken;
};

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
