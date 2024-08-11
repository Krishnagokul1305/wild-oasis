const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "user must have fullName"],
    },
    email: {
      type: String,
      required: [true, "user must have email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "user must have password"],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "user must have confirm password"],
      validate: {
        validator: function (val) {
          return this.password == val;
        },
        message: "passwords does not match",
      },
    },
    role: {
      type: String,
      enum: ["user", "employee"],
      default: "user",
    },
    avatar: String,
    passwordChangedAt: Date,

    // these two fields are usefull for forgot password service
    passwordResetToken: String,
    passwordExpireTime: Date,
  },
  {
    timestamps: true,
  }
);

// pre save middleware to encrypt the password
userSchema.pre("save", async function (next) {
  // If the password hasn't been modified, proceed to the next middleware
  if (!this.isModified("password")) return next();

  // Hash the password if it's a new document or the password has been modified
  this.password = await bcrypt.hash(this.password, 12);

  // Set confirmPassword to undefined to not store it in the database
  this.confirmPassword = undefined;

  // If the document is not new and the password has been modified, set passwordChangedAt
  if (!this.isNew) {
    this.passwordChangedAt = Date.now() - 1000;
  }

  next();
});

// method to compare the user input password and the user db password
// available on all the documents of users
userSchema.methods.isValidPassword = async function (inpPassword, dbPassword) {
  return await bcrypt.compare(inpPassword, dbPassword);
};

// method to check if the user changed password after the token issued
userSchema.methods.hasChangedPassword = function (tokenInitiatedTime) {
  if (!this.passwordChangedAt) return false;
  return new Date(this.passwordChangedAt).getTime() > tokenInitiatedTime * 1000;
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
