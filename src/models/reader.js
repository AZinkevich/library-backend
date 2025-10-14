const mongoose = require("mongoose");


const readerSchema = new mongoose.Schema({
  surname: {
    type: String,
    required: true,
    minLength: 2,
  },
  lastname: {
    type: String,
    required: true,
    minLength: 2,
  },
  readername: {
    type: String,
    required: true,
    minLength: 5,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book", // название модели книги
    },
  ],
});

module.exports = mongoose.model("reader", readerSchema);
