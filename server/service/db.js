const mongoose = require("mongoose");
const dotenv= require ("dotenv");

dotenv.config();

const mongoURI =
process.env.NODE_ENV ==="production"
? process.env.MONGODB_URI_PROD
: process.env.MONGO_URI;


const connectDB = async () => {
    try {
      await mongoose.connect(mongoURI); // Simplified connection
      console.log("MongoDB Connected...");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message || error);
      process.exit(1); // Exit process with failure code
    }
  };
  
  module.exports = connectDB;
  