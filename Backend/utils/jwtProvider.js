const jwt = require("jsonwebtoken");
const AppError = require("./AppError");

exports.createToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_STRING, {
    expiresIn: "180d",
  });
  return token;
};

exports.decodeToken = (token) => {
  try {
    const jwtObj = jwt.verify(token, process.env.JWT_SECRET_STRING);

    return jwtObj;
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      throw new AppError(
        "your session time have expired Please login again",
        401
      );
    }
    if (error.message == "jwt malformed") {
      throw new AppError("Invalid token ", 400);
    }
  }
};
