const AppError = require("./AppError");

module.exports = (fn) => {
  return async (params) => {
    try {
      return await fn(params);
    } catch (err) {
      throw new AppError(err.message, err.statusCode);
    }
  };
};
