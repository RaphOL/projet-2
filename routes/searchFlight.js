const { Router } = require("express");
const express = require("express");
const router = express.Router();
const travelModel = require("../models/travelmodel");

router.get("/search", async (req, res, netx) => {
    try {
      res.render("searchFlight.hbs");
    } catch (err) {
      next(err);
    }
  });
  
  router.post("/search", async (req, res, next) => {
    try {
      const {
        id_Pilote,
        id_user,
        numberOfSeats,
        availableSeats,
        immatriculation,
        Date,
        Price,
        Departure,
        Destination,
        Aircraft,
        departureTime,
        arrvialTime,
      } = req.body;
      const newFlights = travelModel.find(req.body)
      res.redirect(`/search/${req.session.currentUser._id, newFlights}`);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
