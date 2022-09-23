const Message = require("../model/message.model");

const sendMessage = async (message) => {
  console.log(message);
  try {
    const newMessage = await new Message({ ...message });
    newMessage.save();
    return newMessage;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendMessage };
