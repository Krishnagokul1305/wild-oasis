const userService = require("../services/userService");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers(req.query);
    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    res.status(500).send({ error: `Error : ${error.message}` });
  }
};

exports.updateUser = async (req, res, next) => {};
exports.deleteUser = async (req, res, next) => {};
