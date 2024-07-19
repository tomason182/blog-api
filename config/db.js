const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const mongoDb = process.env.MONGO_URL;

async function main() {
  try {
    const conn = await mongoose.connect(mongoDb);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error ocurred while connecting to MongoDB. Error: ${err}`);
    process.exit(1);
  }
}

module.exports = main;
