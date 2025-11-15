const express = require("express");
const router = express.Router();
const get_one_flight = require("../../controllers/flights/getOneFlight");
const get_all_flights = require("../../controllers/flights/getAllFlights");
const add_new_flight = require("../../controllers/flights/addNewFlight");
// const update_flight = require("../../controllers/flights/updateFlight");

router.get("/", get_all_flights);
router.get("/:flightId", get_one_flight);
router.post("/", add_new_flight);
// router.put("/:flightId", update_flight);
module.exports = router;
