const mongoose = require("mongoose");

const mongoConnect = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error(error);
  }
};

module.exports = mongoConnect;
