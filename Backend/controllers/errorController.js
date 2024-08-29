module.exports = (err, req, res, next) => {
  console.log("global error handler working", err);
  // console.log(err.name, err.message);
  res.status(err.statusCode || 500).json({ error: `${err.message}` });
};
