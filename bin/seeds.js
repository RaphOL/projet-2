require("dotenv").config();
const travel = require("../models/travelmodel");
const pilot = require("../models/Pilote");
const user = require("../models/usermodel");
const mongoose = require("mongoose");

console.log(travels[0]);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    a.create(b)
      .then((dbResult) => {
        console.log(dbResult);
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });
