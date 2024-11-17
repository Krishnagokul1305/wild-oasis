const mongoose = require("mongoose");

async function connectDb() {
  const maxRetries = 5; 
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      await mongoose.connect(
        `mongodb+srv://${process.env.DB_EMAIL}:${process.env.DB_PASSWORD}@app.m1lmn2d.mongodb.net/wild-oasis?retryWrites=true&w=majority&appName=app`,
      );
      console.log("Database connection successful");
      break;
    } catch (err) {
      attempts++;
      console.error(
        `Attempt ${attempts}: Error in DB connection: ${err.message}`
      );

      if (attempts >= maxRetries) {
        console.error("Max retries reached. Exiting...");
        process.exit(1);
      }

      await new Promise((res) => setTimeout(res, 5000));
    }
  }
}

module.exports = { connectDb };
