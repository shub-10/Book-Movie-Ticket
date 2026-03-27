const express = require('express');
const Booking = require('../Models/Booking.model');
const router = express.Router();

const getBookingDetails = async(req, res)=>{
   try {
      const {showId} = req.params;
      const bookings = await Booking.find({Show: showId}).select('BookedSeats');
      const seats = new Map()
      for(const booking of bookings){
         // console.log(booking);

         booking.BookedSeats.map(item => {
            if(!seats.has(item.type)){
               seats.set(item.type , item.seats);
            }
            else{
               seats.get(item.type).push(...item.seats);
            }
         })
      }
      console.log(bookings);
      console.log(seats);
      const Booked = Array.from(seats, ([type, seats])=>({type, seats}));
      console.log(Booked);
      return res.status(200).json({message: "Booking seats..", Booked});
   } catch (error) {
    return res.status(500).json({message: "failed to get booking details"});
   }

}

router.get('/details/:showId', getBookingDetails);

module.exports = router;