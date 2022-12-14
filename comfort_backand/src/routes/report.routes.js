const router = require("express").Router();
const { sendMessage, updateReport } = require("../services/report.service");
const Report = require("../model/report.model");
const upload = require("../config/multer.config");

router.get("/", async (req, res) => {
  const message = await Report.find();
  res.json(message);
});

router.post("/send", upload.none(), async (req, res) => {
  const report = await sendMessage(req.body);

  res.json(report);
});

router.put("/update/:id", async (req, res) => {
  const report = await updateReport(req.params.id, req.body);
  res.json(report);
});

router.put("/answer/:id", async (req, res) => {
  const report = await updateReport(req.params.id, req.body);
  res.json(report);
});

module.exports = router;
