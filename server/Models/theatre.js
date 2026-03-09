const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
   name: String,
   location: String,
   brand: String,
   city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City"
   },
   seatTypes: [
    {
      type: {
        type: String,
        enum: ['2D', '3D', '4DX'],
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
   
})

module.exports = mongoose.model('Theatre', theatreSchema);