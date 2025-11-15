const flights = require("../../model/flights");

const add_new_flight = async (req, res) => {
  try {
    const {
      airline,
      flightNumber,
      departureTime,
      departureCity,
      duration,
      arrivalTime,
      arrivalCity,
      cabinClass,
      flightType,
      flightDate,
      price,
      passenger,
    } = req.body;

    if (
      !airline ||
      !flightNumber ||
      !departureTime ||
      !departureCity ||
      !duration ||
      !arrivalTime ||
      !arrivalCity ||
      !cabinClass ||
      !flightType ||
      !flightDate ||
      !price ||
      !passenger
    ) {
      return res.status(400).json({
        message: "All flight data are required",
        data: null,
      });
    }

    const DB_FLIGHTS = await flights.find({});

    const found_flight = DB_FLIGHTS.find(
      ({ flightNumber: FN }) => FN == flightNumber
    );

    if (found_flight) {
      return res.status(400).json({
        message: "Flight already exists",
        data: null,
      });
    }

    const newFlight = new flights({
      airline,
      flightNumber,
      departureTime,
      departureCity,
      duration,
      arrivalTime,
      arrivalCity,
      cabinClass,
      flightType,
      flightDate,
      price,
      passenger,
    });

    await newFlight.save();

    return res.status(201).json({
      message: "Flight added successfully",
      data: newFlight,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = add_new_flight;
