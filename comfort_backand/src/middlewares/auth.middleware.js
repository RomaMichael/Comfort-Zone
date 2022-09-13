const isAuth = (req, res, next) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: "You are unauthorized" });
  }
};

module.exports = { isAuth };
