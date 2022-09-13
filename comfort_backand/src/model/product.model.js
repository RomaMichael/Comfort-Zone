const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// const imgSchema = new Schema(
//   {
//     url: { type: String, required: false },
//     publicId: { type: String, required: false },
//   },
//   { _id: false }
// );

const productSchema = new Schema({
  name: { type: String, required: true, uniqe: true },
  price: { type: Number, required: true },
  text: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  colors: { type: [String], required: true },
  shipping: { type: Boolean, required: true },
  shippingCost: { type: String, required: true },
  available: { type: Boolean, required: true },
  counter: { type: Number, required: true },
  img: { type: String, required: false },
});

const Product = mongoose.model("Product", productSchema);

module.exports = { productSchema, Product };
