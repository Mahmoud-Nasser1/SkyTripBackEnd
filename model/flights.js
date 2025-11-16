const mongoose = require("mongoose");
const flightModel = new mongoose.Schema(
  {
    airline: {
      required: true,
      type: String,
    },
    flightNumber: {
      required: true,
      unique: true,
      type: String,
    },
    departureTime: {
      required: true,
      type: String,
    },
    departureCity: {
      required: true,
      type: String,
    },
    duration: {
      required: true,
      type: String,
    },
    arrivalTime: {
      required: true,
      type: String,
    },
    arrivalCity: {
      required: true,
      type: String,
    },
    cabinClass: {
      required: true,
      type: String,
    },
    flightType: {
      required: true,
      type: String,
    },
    flightDate: {
      required: true,
      type: Date,
    },
    price: {
      required: true,
      type: Number,
    },
    passenger: {
      required: true,
      type: Number,
    },
  },
  { timestamps: false }
);
module.exports = mongoose.model("Flights", flightModel);
