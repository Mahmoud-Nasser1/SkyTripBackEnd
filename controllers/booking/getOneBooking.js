const Booking = require("../../model/booking");

const getOneBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId)
      .populate("bookingFlights")
      .populate("userId");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
        data: null,
      });
    }

    res.status(200).json({
      message: "success",
      data: booking,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      data: null,
    });
  }
};

module.exports = getOneBooking;
