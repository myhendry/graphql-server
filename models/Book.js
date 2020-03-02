const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    author: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
