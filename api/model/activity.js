const mongoose = require("mongoose");
const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
});
const Activity =  mongoose.model("Activity", activitySchema, "activity");
module.exports = Activity;
