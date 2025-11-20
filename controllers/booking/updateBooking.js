const Booking = require("../../model/booking");

const update_booking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const updateData = req.body;

    const updatedBooking = await Booking.findOneAndUpdate(
      { _id: bookingId },
      updateData,
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        message: "Booking not found",
        data: null,
      });
    }

    return res.status(200).json({
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};

module.exports = update_booking;
