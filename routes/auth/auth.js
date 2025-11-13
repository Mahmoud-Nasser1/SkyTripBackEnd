const express = require("express");
const auth_router = express.Router();
const login = require("../../controllers/auth/login");
const register = require("../../controllers/auth/register");

auth_router.post("/login", login);
auth_router.post("/register", register);

module.exports = auth_router;
