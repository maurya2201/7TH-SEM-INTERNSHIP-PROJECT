const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  cid: {
    type: Number,
    required: true,
  },
  bookid: {
    type: Number,
    required: true,
  },
  userid: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
  },
});

const cart = mongoose.model("cart", cartSchema);

module.exports = cart;
