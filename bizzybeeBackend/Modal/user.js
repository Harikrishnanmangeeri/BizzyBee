
const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
  contact: Number,
  username: String,
  email: String,
  password: String,
  avatar: String,
  isBlocked: { type: Boolean, default: false },
});
module.exports = mongoose.model("User", userScheme);
