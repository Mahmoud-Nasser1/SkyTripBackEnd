const express = require("express");
const router = express.Router();
const get_one_user = require("../../controllers/users/getOneUser");
const get_all_users = require("../../controllers/users/getAllUsers");
const update_user = require("../../controllers/users/updateUser");
const check_login = require("../../middleware/check_login_auth");

router.get("/", get_all_users);
router.patch("/me", check_login, update_user);
router.get("/:userId", get_one_user);
module.exports = router;
