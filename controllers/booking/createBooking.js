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

    const flights = await Flight.find({ _id: { $in: flightIds } });
    if (flights.length !== flightIds.length) {
      return res.status(404).json({
        message: "One or more flights not found",
        data: null,
      });
    }

    const passengers = numberOfPassengers || 1;
    const addedPrice =
      flights.reduce((sum, flight) => sum + flight.price, 0) * passengers;

    let existingBooking = await Booking.findOne({ userId });

    if (existingBooking) {
      const duplicateFlights = existingBooking.bookingFlights.filter((id) =>
        flightIds.includes(id.toString())
      );

      if (duplicateFlights.length > 0) {
        return res.status(400).json({
          message: "You already booked one or more of these flights.",
        });
      }

      existingBooking.bookingFlights.push(...flightIds);
      existingBooking.totalPrice += addedPrice;

      await existingBooking.save();

      const updatedBooking = await Booking.findById(existingBooking._id)
        .populate("userId", "firstName lastName email phoneNumber")
        .populate("bookingFlights");

      return res.status(200).json({
        message: "Booking updated successfully",
        data: updatedBooking,
      });
    }

    const newBooking = await Booking.create({
      firstName,
      lastName,
      phoneNumber,
      passportNumber,
      userId,
      bookingFlights: flightIds,
      totalPrice: addedPrice,
      status: "pending",
    });

    const result = await Booking.findById(newBooking._id)
      .populate("userId", "firstName lastName email phoneNumber")
      .populate("bookingFlights");

    return res.status(201).json({
      message: "Booking created successfully",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      data: null,
    });
  }
};

module.exports = createBooking;
