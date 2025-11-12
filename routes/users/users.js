const express = require("express");
const router = express.Router();
const get_one_user = require("../../controllers/users/getOneUser");
const get_all_users = require("../../controllers/users/getAllUsers");
const update_user = require("../../controllers/users/updateUser");

router.get("/", get_all_users);
router.get("/:userId", get_one_user);
router.put("/:userId", update_user);
module.exports = router;
