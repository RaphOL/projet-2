const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const travelSchema = new Schema({
  travel: String,
});

const Travel = mongoose.model("Travel", travelSchema);

module.exports = Travel;
