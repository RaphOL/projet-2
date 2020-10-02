const express = require("express");
const router = express.Router();
const travelModel = require("../models/travelmodel");
const userModel = require("../models/usermodel");
const dayjs = require("dayjs");

router.get("/find/flights", async (req, res, next) => {
  let today = new Date().now;
  let today_format = dayjs(today).format("YYYY-MM-DDTHH:mm");
  try { 
    const departure = req.query.Departure;
    const departureTime = req.query.departureTime;
    let flights;
    if (departureTime) {
      flights = await travelModel.find({
        $and: [

          {Departure: {$regex: '.*' + departure + '.*', $options: 'i'}},
        
          { departureTime: { $gte: departureTime } },
          { availableSeats: { $gte: 1 } },
        ],
      });
    } else {
      flights = await travelModel.find({
        $and: [
          {Departure: {$regex: '.*' + departure + '.*', $options: 'i'}},
          
          { departureTime: { $gte: today_format } },
          { availableSeats: { $gte: 1 } },
        ],
      });
    }
    res.render("searchBar-flight", { flights: flights });
  } catch (err) {
    next(err);
  }
});

router.post("/find/flights", async (req, res, next) => {
  req.redirect("/");
});

module.exports = router;
