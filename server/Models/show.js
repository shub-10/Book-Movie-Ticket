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
  showdate: {
    type: Date,
    required: true
  },
  showtime:{
    type: String
  },
  seatTypes: [
    {
      type: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      totalSeats: {
        type: Number,
        required: true
      },
      availableSeats: {
        type: Number,
        required: true
      }
    }
  ]
}, { unique: true })

module.exports = mongoose.model("Show", showSchema);