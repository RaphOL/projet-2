const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const travelSchema = new Schema({
  id_Pilote: { type: Schema.Types.ObjectId, ref: "Pilote" },
  Seats: Number,
  Date: String,
  Price: Number,
  Destination: String,
  Aircraft: String,
});

const Travel = mongoose.model("Travel", travelSchema);

module.exports = Travel;
