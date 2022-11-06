const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: "You are unauthorized" });
  }
};

const isAdmin = (req, res, next) => {
  console.log("--------------------------------------------------------");
  console.log(req.body.role);
  console.log(req.isAuthenticated());
  if (req.isAuthenticated() && req.body.role === "admin") {
    next();
  } else {
    res.status(401).json({ message: "Only admin access" });
  }
};

module.exports = { isAuth, isAdmin };
