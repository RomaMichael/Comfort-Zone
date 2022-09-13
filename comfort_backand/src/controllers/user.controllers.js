const router = require("express").Router();
const passport = require("passport");
const User = require("../model/user.model");
const { createUser, updateCart } = require("../services/user.services");
const upload = require("../config/multer.config");
const { isAuth } = require("../middlewares/auth.middleware");

router.get("/check-auth", isAuth, (req, res) => {
  try {
    res.status(200).json(req.user._doc);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new Error("Requested user does not exist");
    }
    res.json(user);
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

router.post("/register", upload.single("avatar"), async (req, res) => {
  if (req.file) {
    const user = await createUser(req.body, req.file);

    res.status(201).json(user);
  } else {
    const user = await createUser(req.body);
    res.status(201).json(user);
  }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  const user = req.user;

  // req.session.save();
  res.status(200).json({ user });
});

router.delete("delete/:id", isAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json(user.username);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      res.json({ message: "Could not log out" });
    }

    res.json({ message: "You are now logged out" });
  });
});

router.put("/:id", async (req, res) => {
  const updated = await updateCart(req.params.id, req.body);
  res.json(updated);
});

module.exports = router;
