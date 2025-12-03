const mongoose = require("mongoose");

module.exports = function (flightSchema) {
  flightSchema.pre(
    ["remove", "findOneAndDelete", "findByIdAndDelete"],
    async function (next) {
      let flight;
      if (this instanceof mongoose.Query) {
        flight = await this.model.findOne(this.getFilter());
      } else {
        flight = this;
      }
      if (!flight) return next();

      try {
        console.log("Cleaning up bookings for flight:", flight._id);
        await mongoose.models.Booking.updateMany(
          { bookingFlights: flight._id },
          { $pull: { bookingFlights: flight._id } }
        );
        const result = await mongoose.models.Booking.deleteMany({
          bookingFlights: [],
        });
        console.log("Deleted empty bookings:", result);
        next();
      } catch (err) {
        console.error("Error in flightBookingCleanup:", err);
        next(err);
      }
    }
  );
};
