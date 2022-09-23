const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { UserSchema } = require("../model/user.model");

const messageSchema = new Schema({
  sender: { type: [UserSchema], required: true },
  reciver: { type: [UserSchema], required: true },
  message: { type: String, required: true },
});

const Message = mongoose.model("Messages", messageSchema);

module.exports = Message;
