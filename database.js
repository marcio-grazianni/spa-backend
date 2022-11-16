const mongoose = require("mongoose");

// Do connection with database
const connection = async () => {
  const databaseURL = process.env.DATABASE_URL;
  try {
    await mongoose.connect(databaseURL);
    console.log("Database Connected!");
  } catch (error) {
    console.log(error);
  }
};

connection();
