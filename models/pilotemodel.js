const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const piloteSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
  plane: String,
  image: {
    type: String,
    default:
      "https://lvdneng.rosselcdn.net/sites/default/files/dpistyles_v2/ena_16_9_extra_big/2020/02/17/node_711271/45419059/public/2020/02/17/B9722613703Z.1_20200217091819_000%2BG3TFHMO7H.1-0.jpg?itok=1U-LecqE1581927524",
  },
  licence: String,
  destination: String,
  passenger: Number,
});

const Pilote = mongoose.model("Pilote", piloteSchema);

module.exports = Pilote;
