
const Show = require("../Models/show.model");
const amountMiddleware = async (req, res, next) => {
  try {
    const { showId, seatsByType } = req.body;
    // console.log("showId: ", showId);
    // console.log("seats: ", seatsByType);
    req.showId = showId;

    if (!showId) {
      return res.status(400).json({ message: "Show id is required" });
    }

    const show = await Show.findById(showId);
    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    const safeSeatsByType = Array.isArray(seatsByType) ? seatsByType : [];
    const totalAmount = show.seatTypes.reduce((sum, tier) => {
      const match = safeSeatsByType.find((x) => x.type === tier.type);
      const bookedTickets = match ? match.seats.length : 0;
      return sum + bookedTickets * tier.price;
    }, 0);
    // console.log("amount: ", totalAmount);
    req.amount = totalAmount+30;
    next();
  } catch (error) {
    res.status(400).json({ message: "Payment failed, try again" });
  }
};

module.exports = amountMiddleware;
