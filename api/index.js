const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("../cron/cleanExpiredFlights");

const app = express(); // creating server

require("dotenv").config();

const auth_route = require("../routes/auth/auth");
const users_router = require("../routes/users/users");
const flights_router = require("../routes/flights/flights");
const booking_router = require("../routes/booking/booking");

const PORT = process.env.PORT || 7000;
const DB_URL = process.env.DB_URL;

const allowOrigins = ["https://sky-trip.vercel.app/"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
  })
);

mongoose
  .connect(DB_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database connection error: ", err));

app.use(express.json()); // to parse json request body to js object in case of post/put request

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
