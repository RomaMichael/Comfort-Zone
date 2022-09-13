const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

const store = MongoStore.create({
  client: mongoose.connection.getClient(),
  collection: "session",
});

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
    domain: "localhost",
    sameSite: false,
  },
};

module.exports = sessionConfig;
