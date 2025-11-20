const express = require("express");
const { getFeatured, updateFeatured } = require("../../controllers/featured/featuredController.js");

const router = express.Router();

router.get("/", getFeatured);
router.put("/", updateFeatured);

module.exports = router;
