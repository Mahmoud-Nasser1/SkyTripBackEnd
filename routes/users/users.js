const express = require("express");
const router = express.Router();
const get_one_user = require("../../controllers/users/getOneUser");
const get_all_users = require("../../controllers/users/getAllUsers");
const update_user = require("../../controllers/users/updateUser");
const saveFlightForUser = require("../../controllers/users/saveFlight");
const unsaveFlightForUser = require("../../controllers/users/unsaveFlight");
const getSavedFlights = require("../../controllers/users/getAllSavedFlights");
const check_login = require("../../middleware/check_login_auth");


router.get("/", get_all_users);
router.patch("/me", check_login, update_user);
router.get("/:userId", get_one_user);
router.put("/:userId", update_user);
router.post("/:userId/saveflight/:flightId", saveFlightForUser);
router.delete("/:userId/unsaveflight/:flightId", unsaveFlightForUser);
router.get("/:userId/savedflights", getSavedFlights);

module.exports = router;
