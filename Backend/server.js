const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const app = require("./app");
const { connectDb } = require("./config/dbConnect");

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  await connectDb();
});
