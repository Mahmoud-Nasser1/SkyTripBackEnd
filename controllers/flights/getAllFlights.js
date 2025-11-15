const flights = require("../../model/flights");

const get_all_flights = async (req, res) => {
  try {
    const allFlights = await flights.find({}, { __v: 0 });

    res.status(200).json({
      message: "success",
      data: allFlights,
    });
    
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
module.exports = get_all_flights;
