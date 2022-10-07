const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const reportSchema = new Schema({
  sender: { type: String, required: true },
  report: { type: String, required: true },
  avatar: { type: String, required: true },
  username: { type: String, required: true },
});

const Reports = mongoose.model("Reports", reportSchema);

module.exports = Reports;
