const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
   name: String,
   location: String,
   city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City"
   },
   seatType: {
    type: String,
    enum: ['2D', '3D', '4DX'],
    default : '2D'
   }
   
})

module.exports = mongoose.model('Theatre', theatreSchema);