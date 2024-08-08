const userModel = require("../models/userModel");
const { decodeToken } = require("../utils/jwtProvider");

exports.isAuthenticated = async (req, res, next) => {
  // check if there is token
  if (
    !req.headers.authorization &&
    !req.headers?.authorization?.split(" ")[1]
  ) {
    return res
      .status(400)
      .send({ error: "please provide authorization token" });
  }

  // verify the token
  const token = req.headers.authorization.split(" ")[1];
  const decoded = decodeToken(token);

  // get the user from the db
  const user = await userModel.findById(decoded.id);
  if (!user) {
    return res.status(404).send({ error: "no user found" });
  }

  // check if the user changed the password after token created
  if (user.hasChangedPassword(decoded.iat)) {
    return res.status(404).send({
      error: "user recently changed the password Please login again !",
    });
  }

  req.user = user;
  next();
};

exports.isAuthorized =
  (...authRoles) =>
  async (req, res, next) => {
    if (!authRoles.includes(req.user.role)) {
      return res.status(401).send({
        error: "you are not authorized to access this route",
      });
    }

    next();
  };
