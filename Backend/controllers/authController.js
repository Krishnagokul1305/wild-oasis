const authService = require("../services/authService");
const { createToken } = require("../utils/jwtProvider");
const Email = require("../utils/Email");
const catchControllerError = require("../utils/asyncControllerError");

exports.signup = catchControllerError(async (req, res, next) => {
  const newUser = await authService.signup(req.body);
  const token = createToken(newUser.id);
  res.status(201).json({
    status: "success",
    token,
    data: newUser,
  });
});

exports.loginUser = catchControllerError(async (req, res, next) => {
  const user = await authService.login(req.body);
  const token = createToken(user.id);
  res.status(200).json({
    status: "success",
    token,
    data: user,
  });
});

exports.forgotPassword = catchControllerError(async (req, res, next) => {
  // to save the reset token in db
  const resetToken = await authService.forgotPassword(req.body.email);
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetPassword/${resetToken}`;

  // send the reset token to email
  await new Email({ email: req.body.email }, resetUrl).sendForgotPassword();

  res.status(200).json({
    status: "success",
    message:
      "reset url sent through email , reset url will be expired in 10 minutes",
  });
});

exports.resetPassword = catchControllerError(async (req, res, next) => {
  const { resetToken } = req.params;
  const { confirmPassword, newPassword } = req.body;
  await authService.resetPassword({
    resetToken,
    confirmPassword,
    newPassword,
  });

  res.status(200).json({
    status: "success",
    message: "password reset successfully. Please login again.",
  });
});
