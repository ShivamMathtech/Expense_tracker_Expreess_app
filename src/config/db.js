const mongoose = require("mongoose");
const env = require("dotenv").config();
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database is connected");
  } catch (error) {
    console.log("Somthing Error during the Connection ", error);
  }
};

dbConnection();
module.exports = mongoose;
