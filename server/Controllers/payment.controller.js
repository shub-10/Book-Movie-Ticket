const crypto = require("crypto");
const createRazorpayInstance = require("../config/razorpay.config");
const razorpayInstance = createRazorpayInstance();
const Booking = require('../Models/Booking.model');
const createOrder = async (req, res) => {
  const amountInPaise = Math.round(Number(req.amount || 0) * 100);
  const options = {
    amount: amountInPaise,
    currency: "INR",
    receipt: `rcpt_${Date.now()}`,
    notes: {
      showId: req.showId,
    },
  };

  try {
    razorpayInstance.orders.create(options, (err, order) => {
      if (err) {
        return res.status(500).json({ message: "something went wrong" });
      }
      return res.status(200).json({
        order,
        keyId: process.env.RAZORPAY_APIKEY,
      });
    });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};

const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ success: false, message: "Missing payment details" });
  }

  try {
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    return res.status(200).json({ success: true, message: "Payment verified" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Verification failed" });
  }
};
const logBooking = async(req, res)=>{
  try {
    const {id: userId }= req.user
    const {showId, orderamount, seatsByType} = req.body;
    // console.log("userId: ", userId);
    // console.log("showId: ", showId);
    // console.log("orderAmount: ", orderamount);
    // console.log("seat Types: ", seatsByType);
    const booking = await Booking.create({User: userId, Show: showId, Amount: orderamount, BookedSeats: seatsByType});
  
    return res.status(200).json({message: "Booking logged in the DB", booking})
  } catch (error) {
    return res.status(500).json({message: "Booking are not logged", error});
  }

}
module.exports = { createOrder, verifyPayment, logBooking };
