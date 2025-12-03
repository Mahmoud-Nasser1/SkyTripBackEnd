const mongoose = require("mongoose");

module.exports = function (flightSchema) {
  flightSchema.pre("findOneAndDelete", async function (next) {
    const flight = await this.model.findOne(this.getFilter());

    if (!flight) return next();

    try {
      await mongoose.models.Booking.updateMany(
        { bookingFlights: flight._id },
        { $pull: { bookingFlights: flight._id } }
      );
    } catch (err) {
      return next(err);
    }

    next();
  });

  flightSchema.pre("findByIdAndDelete", async function (next) {
    const flight = await this.model.findOne(this.getFilter());

    if (!flight) return next();

    try {
      await mongoose.models.Booking.updateMany(
        { bookingFlights: flight._id },
        { $pull: { bookingFlights: flight._id } }
      );
    } catch (err) {
      return next(err);
    }

    next();
  });
};
