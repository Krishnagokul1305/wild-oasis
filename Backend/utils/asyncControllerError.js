module.exports = (fn) => {
  return async (req, res, next) => {
    try {
      console.log("controller error handler working");
      return await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
