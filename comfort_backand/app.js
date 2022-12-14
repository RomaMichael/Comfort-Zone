require("dotenv").config();
require("./src/config/mongoose.config")();
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const LocalStrategy = require("passport-local");
const PORT = 8005;
const app = express();
const dataRouter = require("./src/routes/product.routes");
const userRouter = require("./src/routes/user.routes");
const reportRouter = require("./src/routes/report.routes");

const cors = require("cors");
const passport = require("passport");
const sessionConfig = require("./src/config/session.config");
const {
  deserialize,
  serialize,
  verifyCallback,
} = require("./src/config/passport.config");

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

const startegy = new LocalStrategy(verifyCallback);
passport.use(startegy);
passport.serializeUser(serialize);
passport.deserializeUser(deserialize);

app.use("/products", dataRouter);
app.use("/users", userRouter);
app.use("/reports", reportRouter);

mongoose.connection.once("open", () => {
  console.log(`MongoDB is connected`);
  app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
  });
});
