const express = require("express");
const router = express.Router();
const travelModel = require("../models/travelmodel");
const userModel = require("../models/usermodel");

router.get("/find/flights", async (req, res, next) => {
  try {
    console.log(req.body, "super-tototoooo", req.query);
    const departure = req.query.Departure;
    console.log(departure);
    const departureTime = req.query.departureTime;
    let flights;
    if (departureTime) {
      flights = await travelModel.find({
        $and: [
          { Departure: { $eq: departure } },
          { departureTime: { $gte: departureTime } },
          { availableSeats: { $gte: 1 } },
        ],
      });
    } else {
      flights = await travelModel.find({
        $and: [
          { Departure: { $eq: departure } },
          { availableSeats: { $gte: 1 } },
        ],
      });
    }

    console.log(req.params);
    res.render("searchBar-flight", { flights: flights });
  } catch (err) {
    next(err);
  }
});

router.post("/find/flights", async (req, res, next) => {
  req.redirect("/");
});

module.exports = router;
