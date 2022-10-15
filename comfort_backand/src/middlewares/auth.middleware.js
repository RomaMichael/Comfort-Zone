const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: "You are unauthorized" });
  }
};

const isAdmin = (req, res, next) => {
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  console.log(req.user._doc.role);
  if (req.isAuthenticated() && req.user._doc.role === "admin") {
    next();
  } else {
    if (req.user._doc.role !== "admin") {
      return;
    } else {
      res.status(401).json({ message: "Only admin access" });
    }
  }
};

module.exports = { isAuth, isAdmin };
