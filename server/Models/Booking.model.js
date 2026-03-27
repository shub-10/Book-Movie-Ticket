const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    Show: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Show",
      required: true
    },
    BookedSeats: [{
      type:{
        type: String,
        enum: ['2D', '3D', '4DX'],
        required: true
      },
      seats: [Number],
    }],
    Amount:{
      type: Number
    }

})

module.exports = mongoose.model('Booking', bookingSchema);