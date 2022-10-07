const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { userSchema } = require("./user.model");
const { productSchema } = require("./product.model");

const statisticSchema = new Schema({
  user: { type: userSchema },
  cartState: { type: [productSchema] },
});

const Statistic = mongoose.model("Statistic", statisticSchema);

module.exports = Statistic;
