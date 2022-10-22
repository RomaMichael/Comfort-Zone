const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { productSchema } = require("./product.model");

const avatarSchema = new Schema(
  {
    url: { type: String, required: false },
    publicId: { type: String, required: false },
  },
  { _id: false }
);

const userSchema = new Schema({
  _id: { type: String, required: false },
  username: { type: String, required: true },
  email: { type: String, required: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
  role: {
    type: String,
    required: true,
    default: "user",
    enum: ["admin", "user"],
  },
  // messages: { type: Array, required: true },
  avatar: avatarSchema,
  cartState: { type: [productSchema], required: false },
  orders: { type: Object, require: true },
  totalSpend: { type: Number, require: true },
  crationDate: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = { userSchema, User };
