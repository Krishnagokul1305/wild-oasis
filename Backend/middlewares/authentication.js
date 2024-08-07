const userModel = require("../models/userModel");
const { decodeToken } = require("../utils/jwtProvider");

exports.isAuthenticated = async (req, res, next) => {
  // check if there is token
  if (
    !req.headers.authorization &&
    !req.headers?.authorization?.split(" ")[1]
  ) {
    res.status(400).send({ error: "please provide authorization token" });
  }

  // verify the token
  const token = req.headers.authorization.split(" ")[1];
  const decoded = decodeToken(token);

  // get the user from the db
  const user = await userModel.findById(decoded.id);
  console.log(user);
  if (!user) {
    res.status(404).send({ error: "no user found" });
  }

  // check if the token expired

  req.user = user;
  next();
};
