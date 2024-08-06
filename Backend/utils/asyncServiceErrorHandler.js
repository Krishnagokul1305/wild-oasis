module.exports = (fn) => {
  return async (params) => {
    try {
      return await fn(params);
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  };
};
