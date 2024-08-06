const mongoose = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_EMAIL}:${process.env.DB_PASSWORD}@app.m1lmn2d.mongodb.net/wild-oasis?retryWrites=true&w=majority&appName=app`
    );
    console.log("db connected successfully");
  } catch (err) {
    console.log(`error in db : ${err.message}`);
  }
}

module.exports = { connectDb };
