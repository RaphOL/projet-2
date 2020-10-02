const connectMongo = require("connect-mongo");
const { Router } = require("express");
const express = require("express");
const { findByIdAndUpdate } = require("../models/travelmodel");
const router = express.Router();
const travelModel = require("../models/travelmodel");
const userModel = require("../models/usermodel");
const dayjs = require("dayjs");

router.get("/search/flights", async (req, res, next) => {
  try {
    const flights = await travelModel.find(req.body);
    res.render("searchFlight", { flights: flights, scripts: ["/javascripts/clients.js"] });
  } catch (err) {
    next(err);
  }
});

router.post("/search", async (req, res, next) => {
  try {
    res.redirect("/search/flights");
  } catch (err) {
    next(err);
  }
});

router.get("/book/:id", async (req, res, next) => {
  try {
    const myUserBook = req.params.id;

    const userBook = await travelModel.findById(myUserBook);

    res.render("bookFlight", { user: userBook });
  } catch (err) {
    next(err);
  }
});

router.post("/book/:id", async (req, res, next) => {
  const myUserBook = req.params.id;
  res.redirect(`/book/${myUserBook}`);
});

router.post("/book/:id/travelEdit", async (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect("/signin/user");
    return;
  }

  try {
    const myUserBook = req.params.id;
    const userId = req.session.currentUser._id;
    const userDb = await userModel.findByIdAndUpdate(
      { _id: userId },
      { $push: { flights: myUserBook } }
    );
    const travelDb = await travelModel.findByIdAndUpdate(
      { _id: myUserBook },
      { $inc: { availableSeats: -1 }, $push: { id_user: userId } }
    );
    res.redirect(`/profiluser/${req.session.currentUser._id}`);
  } catch (error) {
    next(error);
  }
});

router.get("/delete/travelDelete/:id", async (req, res, next) => {
  // const myUserBook = req.params.id;
  if (!req.session.currentUser) {
    res.redirect("/signin/user");
  }
  const travelId = req.params.id;
  const userId = req.session.currentUser._id;

  try {
    const userDb = await userModel.updateOne(
      { _id: userId },
      { $pullAll: { flights: [travelId] } }
    );
    const travelDb = await travelModel.findByIdAndUpdate(
      { _id: travelId },
      { $inc: { availableSeats: +1 }, $pullAll: { id_user: [userId] } }
    );
    res.redirect(`/profiluser/${req.session.currentUser._id}`);
  } catch (error) {
    next(error);
  }
});

router.get("/delete/:id", async (req, res, next) => {
  const myUserBook = req.params.id;
  const userBook = await travelModel.findById(myUserBook);
  res.render("profiluser", { user: userBook });
});



router.get("/myfilterDepart", async (req, res, next) => { 
  let today = new Date().now;
  let today_format = dayjs(today).format("YYYY-MM-DDTHH:mm");
  try{
  const filterDepart = req.query[0];
   if(filterDepart){
    departure = await travelModel.find({
      $and: [
        {Departure: {$regex: '.*' + filterDepart + '.*', $options: 'i'}},
        { departureTime: { $gte: today_format } },
        {availableSeats: { $gte: 1 }},
      ],  
    });
   }
   else {
    departure = await travelModel.find({
      $and: [
        { departureTime: { $gte: today_format } },
        {availableSeats: { $gte: 1 }},
      ],  
    });
   } 
  res.json(departure);
  }catch(err){
    next(err);
  }
});

// router.get("/myfilterDepart", async (req, res, next) => { 
//   try{
//   const filterDepart = req.query[0];
//    if(filterDepart){
//     departure = await travelModel.find({Departure: {$regex: '.*' + filterDepart + '.*', $options: 'i'}});
//    }
//    else {
//     departure = await travelModel.find();
//    } 
//   res.json(departure);
//   }catch(err){
//     next(err);
//   }
// });

module.exports = router;
