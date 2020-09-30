const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const travelSchema = new Schema({
  id_Pilote: { type: Schema.Types.ObjectId, ref: "Pilote" },
  id_user: [{ type: Schema.Types.ObjectId, ref: "usermodel" }],
  numberOfSeats: Number,
  availableSeats: Number,
  immatriculation: String,
  Description: String,
  image: String,
  Price: Number,
  Departure: String,
  Destination: String,
  Aircraft: { type: String, enum: ["C172", "C182", "DR400"] },
  departureTime: Date,
  arrivalTime: Date,
});

const Travel = mongoose.model("Travel", travelSchema);

module.exports = Travel;
