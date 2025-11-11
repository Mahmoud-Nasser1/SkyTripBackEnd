const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
cors("*");
const app = express(); // creating server

require("dotenv").config();

const PORT = process.env.PORT || 7000;
const DB_URL = process.env.DB_URL;

mongoose
  .connect(DB_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database connection error: ", err));

app.use(express.json());

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
