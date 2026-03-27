const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const amountMiddleware = require('../middlewares/amount.middleware');
const paymentController = require('../Controllers/payment.controller');
const router = express.Router();

router.post('/pay-now', authMiddleware, amountMiddleware, paymentController.createOrder);
router.post('/verify', authMiddleware, paymentController.verifyPayment);
router.post('/bookings-log',authMiddleware, paymentController.logBooking)

module.exports =  router;
