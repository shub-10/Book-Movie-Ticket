const dotenv = require('dotenv').config();
const razorpay = require('razorpay');


const createRazorpayInstance = ()=>{
  return new razorpay({
    key_id: process.env.RAZORPAY_APIKEY,
    key_secret: process.env.RAZORPAY_SECRET
  })
};

module.exports = createRazorpayInstance;
