const users = require("../../model/user");

const getSavedFlights = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await users.findById(userId).populate("savedFlights");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User Saved flights",
      data: user.savedFlights,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports = getSavedFlights;
