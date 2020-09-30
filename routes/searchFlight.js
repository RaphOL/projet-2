const connectMongo = require("connect-mongo");
const { Router } = require("express");
const express = require("express");
const router = express.Router();
const travelModel = require("../models/travelmodel");

router.get("/search/flights", async (req, res, next) => {
  try {
    const flights = await travelModel.find(req.body);
    console.log(flights);
    res.render("searchFlight", { flights: flights });
  } catch (err) {
    next(err);
  }
});

router.post("/search", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

module.exports = router;
