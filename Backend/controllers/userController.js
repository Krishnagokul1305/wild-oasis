const userService = require("../services/userService");
const { createToken } = require("../utils/jwtProvider");
const catchControllerError = require("../utils/asyncControllerError");

exports.getAllUsers = catchControllerError(async (req, res, next) => {
  const users = await userService.getAllUsers(req.query);
  res.status(200).json({
    status: "success",
    results: users.length,
    data: users,
  });
});

exports.getUser = catchControllerError(async (req, res, next) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.createNewUser = catchControllerError(async (req, res, next) => {
  const { _id, fullName, email, createdAt } = await userService.createUsers(
    req.body
  );

  res.status(201).json({
    status: "success",
    data: { _id, fullName, email, createdAt },
  });
});

exports.updateUserData = catchControllerError(async (req, res, next) => {
  if (req.body.password) {
    throw new AppError("This route is not for updating password", 400);
  }
  const updatedUser = await userService.updateUserDetails({
    id: req.user.id,
    updateData: req.body,
  });
  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});

exports.updatePassword = catchControllerError(async (req, res, next) => {
  const updatedUser = await userService.updateUserPassword({
    user: req.user,
    newPassword: req.body.newPassword,
    confirmPassword: req.body.newPassword,
  });

  const token = createToken(updatedUser.id);
  res.status(200).json({
    status: "success",
    token,
    data: updatedUser,
  });
});

exports.deleteUser = catchControllerError(async (req, res, next) => {
  // Implement your delete user logic here
});
