const flights = require("../../model/flights");

const get_single_flight = async (req, res) => {
  const { flightId: id } = req.params;
  
  
  try {
    const searched_flight = await flights.findById(id, { __v: 0 });

    if (!searched_flight) {
      return res.status(404).json({
        message: "Flight not found",
        data: null,
      });
    }
    

    return res.status(200).json({
      message: "Flight found success",
      data: searched_flight,
    });

  } catch (err) {
    res.status(400).json({
      message: "Invalid flight ID",
      data: null,
    });
  }
};

module.exports = get_single_flight;
