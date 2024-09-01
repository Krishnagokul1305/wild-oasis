function DuplicatedError(err, res) {
  console.log("dup error")
  res.status(err.statusCode || 500).json({ error: "document already exists" });
}

function regularError(err, res){
  console.log("regular error")
  res.status(err.statusCode || 500).json({ error: `${err.message}` });
}

module.exports = (err, req, res, next) => {
  console.log("global error handler working", err);
  console.log(err.message?.includes("E11000"))
  if (err.message?.includes("E11000")) return DuplicatedError(err, res);
  regularError(err,res)
};
