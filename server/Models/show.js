const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true
  },
  theatre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theatre",
    required: true
  },
  showtime: {
    type: String,
    required: true
  },
  showdate: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model("Show", showSchema);