const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  user_id:{type:mongoose.Schema.ObjectId,ref:"User"},
  Quntatity: Number,
  AvaliableQty:Number,
  ProductName: String,
  Price: Number,
  Image: String,
  isBlocked: { type: Boolean, default: false },
});
module.exports = mongoose.model("Product", ProductSchema);
