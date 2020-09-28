const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const travelSchema = new Schema({
  type: String,
  seats: Number,
  Date: String,
  Price: Number,
  Destination: String,
  Aircraft: String,
});

const Travel = mongoose.model("Travel", travelSchema);

module.exports = Travel;
