const router = require("express").Router();
const { sendMessage } = require("../services/messages.service");
const Message = require("../model/message.model");

router.get("/", async (req, res) => {
  const message = await Message.find();
  res.json(message);
});

router.post("/send", async (req, res) => {
  const message = await sendMessage(req.body);

  res.json(message);
});

module.exports = router;
