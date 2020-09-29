const express = require("express");
const router = express.Router();
const travelModel = require("../models/travelmodel");

router.get("/add", function (req, res, next) {
  res.render("addFlight");
});

router.post("/add", async (req, res, next) => {
  try {
    const { id_Pilote, id_user, numberOfSeats, availableSeats, immatriculation, Price,
      Departure, Destination, Aircraft, departureTime,  arrvialTime, } = req.body;
    const objTravel = {
      id_Pilote: req.session.currentUser._id,
      numberOfSeats,
      arrvialTime,
      availableSeats,
      Aircraft,
      Departure,
      Destination,
      immatriculation,
      Price,
      departureTime,
    };

    const travel = travelModel.create(objTravel);
    res.redirect(`/profilpilote/${req.session.currentUser._id}`);
  } catch (err) {
    next(err);
  }
});

router.get("/edit/:id", async(req, res, next)=> {  
  const travel = await travelModel.findById(req.params.id);
  
  console.log("do you want a piece of me boy: ", travel);
  res.render("editFlight", {travel, pilote: req.session.currentUser._id});
});

router.post("/edit/:id", async(req, res, next)=> {
  try{
    const travel = await travelModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  } catch(err){
    next(err);
  }
  res.redirect(`/profilpilote/${req.session.currentUser._id}`);
});

router.get("/delete/:id", async (req, res, next) => {
  try {
    const travel = await travelModel.findByIdAndDelete(req.params.id); 
  } catch(err) {
    next(err);
  }
  res.redirect(`/profilpilote/${req.session.currentUser._id}`);
});

module.exports = router;
