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
      enum: ["guest", "employee"],
      default: "guest",
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
  if (!this.isModified("password")) return next();

  const encryptedPassword = await bcrypt.hash(this.password, 12);
  this.password = encryptedPassword;
  this.confirmPassword = undefined;
  next();
});

// method to compare the user input password and the user db password
// available on all the documents of users
userSchema.methods.isValidPassword = async function (inpPassword, dbPassword) {
  console.log(inpPassword);
  return await bcrypt.compare(inpPassword, dbPassword);
};

// method to check if the user changed password after the token issued
userSchema.methods.hasChangedPassword = function (tokenInitiatedTime) {
  if (!this.passwordChangedAt) return false;
  return new Date(this.passwordChangedAt).getTime() > tokenInitiatedTime * 1000;
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
