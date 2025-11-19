const express = require("express");
const router = express.Router();
const getOneBooking = require("../../controllers/booking/getOneBooking");
const getAllBookings = require("../../controllers/booking/getAllBooking");
const createBooking = require("../../controllers/booking/createBooking");
const updateBooking = require("../../controllers/booking/updateBooking");
const getUserBookings = require("../../controllers/booking/getUserBooking");
const checkLogin = require("../../middleware/check_login_auth");
const checkRole = require("../../middleware/check_role");

router.get("/my", checkLogin, getUserBookings);
router.get("/admin/all", checkLogin, checkRole("admin"), getAllBookings);

router.get("/:bookingId", checkLogin, getOneBooking);
router.post("/", checkLogin, createBooking);
router.put("/:bookingId", updateBooking);

module.exports = router;
