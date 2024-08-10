const authService = require("../services/authService");
const { createToken } = require("../utils/jwtProvider");
const Email = require("../utils/Email");

exports.createUser = async (req, res, next) => {
  try {
    const newUser = await authService.signup(req.body);
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
    const user = await authService.login(req.body);
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

exports.forgotPassword = async (req, res, next) => {
  try {
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
  } catch (error) {
    res.status(500).send({ error: `Error : ${error.message}` });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { resetToken } = req.params;
    const { confirmPassword, newPassword } = req.body;
    await authService.resetPassword({
      resetToken,
      confirmPassword,
      newPassword,
    });

    res.status(200).json({
      status: "success",
      message: "password resetted successfully login again",
    });
  } catch (error) {
    res.status(500).send({ error: `Error : ${error.message}` });
  }
};
