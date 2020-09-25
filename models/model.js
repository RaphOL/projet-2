const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const xSchema = new Schema({});

const x = mongoose.model("x", xSchema);

module.exports = Label;
