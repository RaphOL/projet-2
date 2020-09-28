const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const piloteSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
  licenceId: String,
  issueDate: Date,
  expiryDate: Date,
  deliveryCountry: String,
  licenceType: String,
  ratingPilote: [String],
  medicale: String,
  flc055: String,
  isPilote: Boolean,
});

const PiloteModel = mongoose.model("Pilote", piloteSchema);

module.exports = PiloteModel;
