const Flight = require("../../model/flights");

const delete_flight = async (req, res) => {
  const { flightId: id } = req.params;

  try {
    const flight = await Flight.findById(id);
    if (!flight) {
      return res.status(404).json({
        message: "Flight not found",
        data: null,
      });
    }

    await flight.remove();

    return res.status(200).json({
      message: "Flight deleted successfully",
      data: flight,
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({
        message: "Invalid flight ID format",
        data: null,
      });
    }

    return res.status(500).json({
      message: "Server error while deleting flight",
      data: null,
    });
  }
};

module.exports = delete_flight;
