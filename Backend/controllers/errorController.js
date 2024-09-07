function DuplicatedError(err, res) {
  res.status(err.statusCode || 500).json({ error: "document already exists" });
}

function regularError(err, res) {
  res.status(err.statusCode || 500).json({ error: `${err.message}` });
}

module.exports = (err, req, res, next) => {
  console.log(err)
  if (err.message?.includes("E11000")) return DuplicatedError(err, res);
  regularError(err, res);
};
