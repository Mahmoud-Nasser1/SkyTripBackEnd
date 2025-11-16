const cron = require("node-cron");
const flights = require("../model/flights");

cron.schedule("0 0 * * *", async () => {
  const today = new Date();

  try {
    const result = await flights.deleteMany({
      flightDate: { $lt: today },
    });

    if (result.deletedCount > 0) {
      console.log(`Old flights cleaned: ${result.deletedCount} flights`);
    } else {
      console.log("No old flights to clean today.");
    }
  } catch (err) {
    console.error("Error cleaning old flights:", err);
  }
});
