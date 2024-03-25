
const mongoose = require("mongoose");

const RentSchema = new mongoose.Schema({
  contact: Number,
  name: String,
  Location: String,
  Products: [],
  date:Date,
  getDate:Date,
  Quntaty: Number,
  isBlocked: { type: Boolean, default: false },
});
module.exports = mongoose.model("Rent", RentSchema);