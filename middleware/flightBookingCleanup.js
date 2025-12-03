const mongoose = require("mongoose");

module.exports = function (flightSchema) {
  async function cleanupBookings(flightId) {
    await mongoose.models.Booking.updateMany(
      { bookingFlights: flightId },
      { $pull: { bookingFlights: flightId } }
    );

    await mongoose.models.Booking.deleteMany({ bookingFlights: { $size: 0 } });
  }

  flightSchema.pre("findOneAndDelete", async function (next) {
    const flight = await this.model.findOne(this.getFilter());
    if (!flight) return next();

    try {
      await cleanupBookings(flight._id);
      next();
    } catch (err) {
      next(err);
    }
  });

  flightSchema.pre("findByIdAndDelete", async function (next) {
    const flight = await this.model.findOne(this.getFilter());
    if (!flight) return next();

    try {
      await cleanupBookings(flight._id);
      next();
    } catch (err) {
      next(err);
    }
  });

  flightSchema.pre("remove", async function (next) {
    try {
      await cleanupBookings(this._id);
      next();
    } catch (err) {
      next(err);
    }
  });
};
