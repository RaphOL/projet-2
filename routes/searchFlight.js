const connectMongo = require("connect-mongo");
const { Router } = require("express");
const express = require("express");
const { findByIdAndUpdate } = require("../models/travelmodel");
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
  console.log();
  // const myUserBook = req.params.id;
  console.log("pouet");
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
  console.log("here part 42");
  const userBook = await travelModel.findById(myUserBook);
  res.render("profiluser", { user: userBook });
});

module.exports = router;

//il faut vérifier si jamais nombre de seat ok
// il faut décrémeter le nombre de seat dans le modèle ( collection travel DB )
// ajouter le passager dans le vol (travel DB)
// enregistrer le vol dans la db user / quel user ?
// renvoyer sur le profil avec le vol booké
