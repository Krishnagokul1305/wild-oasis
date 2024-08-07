const { signup, login } = require("../services/authService");
const { createToken } = require("../utils/jwtProvider");

exports.createUser = async (req, res, next) => {
  try {
    const newUser = await signup(req.body);
    const token = createToken(newUser.id);
    res.status(201).json({
      status: "success",
      token,
      data: newUser,
    });
  } catch (error) {
    res.status(500).send({ error: `Error : ${error.message}` });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const user = await login(req.body);
    const token = createToken(user.id);
    res.status(200).json({
      status: "success",
      token,
      data: user,
    });
  } catch (error) {
    res.status(500).send({ error: `Error : ${error.message}` });
  }
};
