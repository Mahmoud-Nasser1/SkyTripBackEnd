const flights = require("../../model/flights");

const update_flight = async (req, res) => {
  try {
    const { flightId: id } = req.params;

    const updatedData = req.body;

    if (!updatedData || Object.keys(updatedData).length === 0) {
      return res.status(400).json({
        message: "Flight data are required",
        data: null,
      });
    }
    if (updatedData.flightDate) {
      const flightDateObj = new Date(updatedData.flightDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (flightDateObj < today) {
        return res.status(400).json({
          message: "Flight date cannot be in the past",
          data: null,
        });
      }
    }

    const updatedFlight = await flights.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedFlight) {
      return res.status(404).json({
        message: "Flight not found",
        data: null,
      });
    }

    return res.status(200).json({
      message: "Flight updated successfully",
      data: updatedFlight,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = update_flight;
