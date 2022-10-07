const router = require("express").Router();
const upload = require("../config/multer.config");
const Statistic = require("../model/Statistics.model");

router.post("/new-statistic", upload.none(), async (req, res) => {
  console.log("----------------------------------------------------------");
  console.log(req.body.cartState);
  const user = JSON.parse(req.body.user);
  const cartState = JSON.parse(req.body.cartState);

  const statistic = new Statistic({ user, cartState });
  await statistic.save();
  res.json(statistic);
});

router.get("/", async (req, res) => {
  const statistic = await Statistic.find();
  res.json(statistic);
});

module.exports = router;
