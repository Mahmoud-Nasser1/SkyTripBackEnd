const users = require("../../model/user");
const unsaveFlightForUser = async (req, res) => {
  try {
    const { userId, flightId } = req.params;

    const userr = await users.findById(userId);

    if (!userr) {
      return res.status(404).json({ message: "User not found", data: null });
    }

    if (!userr.savedFlights.includes(flightId)) {
      return res.status(400).json({
        message: "Flight is not in saved list",
        data: null,
      });
    }

    const user = await users
      .findByIdAndUpdate(
        userId,
        { $pull: { savedFlights: flightId } },
        { new: true }
      )
      .populate("savedFlights");

    res.status(200).json({
      message: "Flight removed successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports = unsaveFlightForUser;
