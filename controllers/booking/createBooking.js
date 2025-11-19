const Booking = require("../../model/booking");
const Flight = require("../../model/flights");

const createBooking = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      firstName,
      lastName,
      phoneNumber,
      passportNumber,
      flightIds,
      numberOfPassengers,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !passportNumber ||
      !flightIds ||
      !Array.isArray(flightIds) ||
      flightIds.length === 0
    ) {
      return res.status(400).json({
        message: "Missing required fields or flightIds is empty",
        data: null,
      });
    }

    const existingBooking = await Booking.findOne({
      userId,
      bookingFlights: { $all: flightIds, $size: flightIds.length },
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "You already booked this flight.",
        data: existingBooking,
      });
    }

    const flights = await Flight.find({ _id: { $in: flightIds } });

    if (flights.length !== flightIds.length) {
      return res.status(404).json({
        message: "One or more flights not found",
        data: null,
      });
    }

    const passengers = numberOfPassengers || 1;

    const totalPrice =
      flights.reduce((sum, flight) => sum + flight.price, 0) * passengers;

    const booking = await Booking.create({
      firstName,
      lastName,
      phoneNumber,
      passportNumber,
      userId,
      bookingFlights: flightIds,
      totalPrice,
      status: "pending",
    });

    const newBooking = await Booking.findById(booking._id)
      .populate("userId", "firstName lastName email phoneNumber")
      .populate("bookingFlights");

    return res.status(201).json({
      message: "Booking created successfully",
      data: newBooking,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      data: null,
    });
  }
};

module.exports = createBooking;
