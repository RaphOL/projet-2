const express = require("express");
const router = express.Router();
const travelModel = require("../models/travelmodel");

router.get("/", async (req, res, next) => {
  try {
    const flights = await travelModel.find(req.body);
    console.log(flights);
    res.render("/", { flights: flights });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
