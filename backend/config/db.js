const mongoose = require("mongoose");

let cached = null;

const connectDB = async () => {
  if (cached) {
    return cached;
  }

  try {
    cached = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    return cached;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error; // ❗ DO NOT process.exit in Lambda
  }
};

module.exports = connectDB;
