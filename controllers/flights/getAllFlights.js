const flights = require("../../model/flights");

const get_all_flights = async (req, res) => {
  try {
    const isAdmin = String(req.query.all).toLowerCase() === "true";
    console.log(isAdmin,req.query.all);

    let allFlights;

    if (isAdmin) {
      allFlights = await flights.find({}, { __v: 0 });
    } else {
      const limit = parseInt(req.query.limit) || 5;
      const page = parseInt(req.query.page) || 1;
      const skip = (page - 1) * limit;

      allFlights = await flights.find({}, { __v: 0 }).skip(skip).limit(limit);
    }
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
