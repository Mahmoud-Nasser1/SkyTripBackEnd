const Booking = require("../../model/booking");

const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate("bookingFlights")
      .populate("userId");

    res.status(200).json({
      message: "success",
      data: bookings,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      data: null,
    });
  }
};

module.exports = getUserBookings;
