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
    bookedSeatTypes:{
        "2d": [],
        "3d": [],
        "4dx": [],
    },
    amount: Number,

})

module.exports = mongoose.model('Bookings', bookingSchema);