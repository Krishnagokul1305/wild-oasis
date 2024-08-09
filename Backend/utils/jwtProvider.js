const jwt = require("jsonwebtoken");

exports.createToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_STRING, {
    expiresIn: "180d",
  });
  return token;
};

exports.decodeToken = (token) => {
  const jwtObj = jwt.verify(token, process.env.JWT_SECRET_STRING);
  return jwtObj;
};
