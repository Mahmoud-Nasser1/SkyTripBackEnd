const mongoose = require("mongoose");

module.exports = function (flightSchema) {
  flightSchema.pre(
    ["findOneAndDelete", "findByIdAndDelete", "remove"],
    async function (next) {
      let flight;
      if (this instanceof mongoose.Query) {
        flight = await this.model.findOne(this.getFilter());
      } else {
        flight = this;
      }
      if (!flight) return next();

      try {
        await mongoose.models.Booking.updateMany(
          { bookingFlights: flight._id },
          { $pull: { bookingFlights: flight._id } }
        );

        await mongoose.models.Booking.deleteMany({
          bookingFlights: { $size: 0 },
        });

        next();
      } catch (err) {
        console.error("Error in flightBookingCleanup:", err);
        next(err);
      }
    }
  );
};
