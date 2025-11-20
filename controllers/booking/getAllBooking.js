const bookings = require("../../model/booking");

const getAllBookings = async (req, res) => {
  try {
    const allBookings = await bookings
      .find()
      .populate("bookingFlights")
      .populate("userId");

    res.status(200).json({
      message: "success",
      data: allBookings,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      data: null,
    });
  }
};
module.exports = getAllBookings;
