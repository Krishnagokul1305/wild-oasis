const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const catchAsync = require("../utils/asyncErrorHandler");
const AppError = require("../utils/AppError");
const sendMail = require("../utils/sendMail");

// function to create json web tokens based on the id of users
function createJwtToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET_STRING, {
    expiresIn: process.env.JWT_TOKEN_EXPIRES,
  });
}

// functionality for signin of new users
exports.signin = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide email and password",
    });
  }

  const newUser = await userModel.create(req.body);
  const token = createJwtToken(newUser.id);
  res.status(200).json({
    status: "success",
    token,
  });
});

// login functionality
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("please provide email and password", 400));
  }
  const user = await userModel.findOne({ email }).select("+password");

  if (!user || !(await user.comparePasswords(password))) {
    return next(
      new AppError("user not found : Invalid password or email", 404)
    );
  }
  const token = createJwtToken(user.id);
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.restricto = catchAsync(async (req, res, next) => {});

//protect the routes
exports.protect = catchAsync(async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new AppError("please provide token to access", 401));
  }
  const token = req.headers.authorization.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET_STRING);
  if (!decoded) {
    return next(new AppError("Unauthorized access - invalid token", 401));
  }
  const user = await userModel.findOne({ _id: decoded.id });

  if (user.isPasswordChanged(decoded.iat)) {
    return next(
      new AppError(
        "Unauthorized access - password has changed recently Please login again !",
        401
      )
    );
  }
  req.user = user;
  next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(
      new AppError(
        "no user exist for the email you have given : check emailId",
        400
      )
    );
  }
  const resetToken = await user.createPasswordToken();
  await user.save({ runValidators: false });

  // Construct password reset URL and send email
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot your password? Submit your PATCH request to: ${resetUrl}`;

  // send reset token to email
  await sendMail({
    email,
    subject: "reset password",
    message,
  });

  res.status(200).json({
    message: "reset token sent to email",
  });
});

// reset password functionality
exports.resetPassword = catchAsync(async (req, res, next) => {
  const { resetToken } = req.params;

  console.log(resetToken);
  const encrypted = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await userModel.findOne({
    passwordResetToken: encrypted,
    tokenExpireTime: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Invalid token or token expired", 401));
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.tokenExpireTime = undefined;
  user.passwordResetToken = undefined;
  await user.save();

  const jwtToken = createJwtToken(user.id);
  res.status(200).json({
    status: "success",
    token: jwtToken,
  });
});

// function to update password
exports.updatePassword = catchAsync(async (req, res, next) => {
  if (!req.body.password || !req.body.passwordConfirm) {
    return next(
      new AppError("Please provide password and passwordConfirm", 400)
    );
  }

  if (req.body.password !== req.body.passwordConfirm) {
    return next(new AppError("password doesn't match confirm password", 400));
  }

  const user = req.user;
  user.password = req.body.password;
  user.confirmPassword = req.body.password;
  await user.save();

  res.status(200).json({
    status: "success",
    data: user,
  });
});

// some problem in resetpassword functionality in passwordupdated time
