const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const piloteSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
  address: String,
  city:String,
  zipCode:String,
  licenceId: String,
  licenceType: String,
  deliveryCountry: String,
  issueDate: Date,
  expiryDate: Date,

  ratingPilote: [String],
  medicale: String,
  flc055: String,


  isPilote: Boolean,
});

const PiloteModel = mongoose.model("Pilote", piloteSchema);

module.exports = PiloteModel;
