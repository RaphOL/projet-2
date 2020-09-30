const connectMongo = require("connect-mongo");
const { Router } = require("express");
const express = require("express");
const router = express.Router();
const travelModel = require("../models/travelmodel");
const userModel = require("../models/usermodel");

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

router.get("/book/:id", async (req, res, next) => {
  const myUserBook = req.params.id;

  const userBook = await travelModel.findById(myUserBook);
  res.render("bookFlight", { user: userBook });
});

router.post("/book/:id", async (req, res, next) => {
  const myUserBook = req.params.id;
  res.redirect(`/book/${myUserBook}`);
});

module.exports = router;
