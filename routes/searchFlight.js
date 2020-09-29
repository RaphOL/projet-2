const { Router } = require("express");
const express = require("express");
const router = express.Router();
const travelModel = require("../models/travelmodel");

router.get("/search", async (req, res, next) => {
  try {
    res.render("searchFlight");
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
