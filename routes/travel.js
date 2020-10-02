const express = require("express");
const router = express.Router();
const travelModel = require("../models/travelmodel");
const uploader = require("../config/cloudinary");

router.get("/add", function (req, res, next) {
  res.render("addFlight", { scripts: ["/javascripts/checkFlightPilote.js"] });
});

router.post("/add", async (req, res, next) => {
  try {
    const {
      id_Pilote,
      id_user,
      numberOfSeats,
      availableSeats,
      immatriculation,
      Price,
      Departure,
      Destination,
      Aircraft,
      departureTime,
      arrivalTime,
      Description,
    } = req.body;
    const objTravel = {
      id_Pilote: req.session.currentUser._id,
      numberOfSeats,
      arrivalTime,
      availableSeats,
      Aircraft,
      Departure,
      Destination,
      immatriculation,
      Price,
      departureTime,
      Description,
    };
    const travel = travelModel.create(objTravel);
    res.redirect(`/profilpilote/${req.session.currentUser._id}`);
  } catch (err) {
    next(err);
  }
});

router.get("/edit/:id", async (req, res, next) => {
  const travel = await travelModel.findById(req.params.id);
  res.render("editFlight", { travel, pilote: req.session.currentUser._id });
});

router.post("/edit/:id", uploader.single("image"), async (req, res, next) => {
  try {
    const newTravel = req.body;

    console.log(req.file,"this is rea file")
    if (req.file) {
      newTravel.image = req.file.path;
    }

    const travel = await travelModel.findByIdAndUpdate(
      req.params.id,
      newTravel,
      { new: true }
      );
      res.redirect(`/profilpilote/${req.session.currentUser._id}`);
  } catch (err) {
    next(err);
  }

});

router.get("/delete/:id", async (req, res, next) => {
  try {
    const travel = await travelModel.findByIdAndDelete(req.params.id);
  } catch (err) {
    next(err);
  }
  res.redirect(`/profilpilote/${req.session.currentUser._id}`);
});

module.exports = router;
