const express = require("express");
const router = express.Router();
const travelModel = require("../models/travelmodel");
const userModel = require("../models/usermodel");

router.get("/find/flights", async (req, res, next) => {
  try {
    console.log(">>>>>>>>>>>>tototooaaaaaaaaa<<<<<<<<<<<<<<");
    const flights = await travelModel.find(req.body);
    const flightID = await travelModel.findById(req.params.id);

    console.log(req.params);
    res.render("index", { flights: flights, flightID });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  req.redirect("/find/flights");
});

module.exports = router;
