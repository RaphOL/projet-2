require("dotenv").config();
const travel = require("../models/travelmodel");
const pilot = require("../models/Pilote");
const user = require("../models/usermodel");
const mongoose = require("mongoose");

const travels = [
  {
    numberOfSeats: 4,
    availableSeats: 3,
    immatriculation: "F-ABVF",
    Description: "",
    image: "./images/Bordeaux-1.jpg",
    Price: 67,
    Departure: Bordeaux,
    Destination: Nantes,
    Aircraft: C182,
  },
];
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
