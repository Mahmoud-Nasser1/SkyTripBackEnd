const mongoose = require("mongoose");

const { nanoid } = require("nanoid");

const bookingModel = new mongoose.Schema(
  {
    firstName: {
      required: true,
      type: String,
    },
    lastName: {
      required: true,
      type: String,
    },
    phoneNumber: {
      required: true,
      type: String,
    },
    passportNumber: {
      required: true,
      type: String,
    },
    bookingCode: {
      unique: true,
      type: String,
      default: () => "SKY-" + nanoid(5),
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    bookingFlights: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Flights",
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: false }
);
module.exports = mongoose.model("Booking", bookingModel);
