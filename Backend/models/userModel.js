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
  const encryptedPassword = await bcrypt.hash(this.password, 12);
  this.password = encryptedPassword;
  this.confirmPassword = undefined;
  next();
});

// method to compare the user input password and the user db password
// available on all the documents of users
userSchema.methods.isValidPassword = async function (inpPassword, dbPassword) {
  return await bcrypt.compare(inpPassword, dbPassword);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
