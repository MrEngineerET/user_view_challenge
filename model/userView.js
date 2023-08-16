const mongoose = require("mongoose");

const userViewSchema = new mongoose.Schema({
  userId: String,
  viewDate: Date,
  productId: String,
});

exports.UserView = mongoose.model("UserView", userViewSchema);
