const mongoose = require("mongoose");
const seedStateSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  lastSeedStart: { type: Date, required: true }
});
module.exports = mongoose.model("SeedState", seedStateSchema);