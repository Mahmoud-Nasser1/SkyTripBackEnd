const mongoose = require("mongoose");
const crypto = require("crypto");

const ALPH = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function nanoidLike(size = 5) {
  const bytes = crypto.randomBytes(size);
  let id = "";
  for (let i = 0; i < size; i++) {
    id += ALPH[bytes[i] % ALPH.length];
  }
  return id;
}
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
      default: () => "SKY-" + nanoidLike(5),
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
bookingModel.pre("validate", async function (next) {
  if (this.bookingCode && this.isModified("bookingCode") === false) {
    return next();
  }

  let tries = 0;
  const maxTries = 5;
  let code;

  do {
    code = "SKY-" + nanoidLike(5);
    const existing = await mongoose.models.Booking?.findOne({
      bookingCode: code,
    })
      .lean()
      .exec();
    if (!existing) {
      this.bookingCode = code;
      return next();
    }
    tries++;
  } while (tries < maxTries);

  this.bookingCode = code;
  return next();
});

module.exports = mongoose.model("Booking", bookingModel);
