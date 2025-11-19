const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("../cron/cleanExpiredFlights");

const app = express(); // creating server

app.use(cors());
require("dotenv").config();

const auth_route = require("../routes/auth/auth");
const users_router = require("../routes/users/users");
const flights_router = require("../routes/flights/flights");
const booking_router = require("../routes/booking/booking");

const PORT = process.env.PORT || 7000;
const DB_URL = process.env.DB_URL;

mongoose
  .connect(DB_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database connection error: ", err));

app.use(express.json());

app.use("/api/v1/auth", auth_route);
app.use("/api/v1/users", users_router);
app.use("/api/v1/flights", flights_router);
app.use("/api/v1/booking", booking_router);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome home",
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: "wrong routing",
    data: null,
  });
});

app.listen(PORT, (err) => {
  console.log(`Server runnig on port ${PORT}`);
});

module.exports = app;
