const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  sid: {
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
  cover: {
    type: String,
  },
  sname: {
    type: String,
  },
  selling: {
    type: Number,
  },
  buyerid: {
    type: String,
  },
  buyerquantity: {
    type: String,
  },
});

const book = mongoose.model("book", bookSchema);

module.exports = book;
