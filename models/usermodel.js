const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
  image: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQhVCVV2vEZkPS1sMCHgmPsfLpWfr8wb-OubQ&usqp=CAU",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
