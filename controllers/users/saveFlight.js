const users = require("../../model/user");
const flights = require("../../model/flights");

const saveFlightForUser = async (req, res) => {
  try {
    const { userId, flightId } = req.params;

    const flight = await flights.findById(flightId);
    if (!flight) {
      return res.status(404).json({
        message: "Flight not found",
      });
    }

    const user = await users
      .findByIdAndUpdate(
        userId,
        { $addToSet: { savedFlights: flightId } },
        { new: true }
      )
      .populate("savedFlights");

    res.status(200).json({
      message: "Flight saved successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports = saveFlightForUser;
