const express = require("express");
const router = new express.Router();
const Pilot = require("../models/Pilote");
const Travel = require("../models/travelmodel");
const bcrypt = require("bcrypt");
const dayjs = require("dayjs");

router.get("/signin/pilot", function (req, res, next) {
  res.render("signin/signinpilot");
});

router.post("/signin/pilot", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const foundPilot = await Pilot.findOne({ email });
    if (!foundPilot) {
      // This will be handled, by the eraseSessionMessage middelware in app.js
      // req.session.msg = { status: 401, text: "Invalid credentials" };
      /**  Same could be done using the flash middleware **/
      req.flash("error", "Invalid credentials"); // If you wanted to use flash you could aswell, you would have to handle i
      return res.redirect("/signin/pilot");
    }
    if (!bcrypt.compareSync(password, foundPilot.password)) {
      req.flash("error", "Invalid credentials");
      // req.session.msg = { status: 401, text: "Invalid credentials" };
      return res.redirect("/signin/pilot");
    }
    req.session.currentUser = foundPilot;

    res.redirect(`/profilpilote/${foundPilot._id}`);
  } catch (err) {
    next(err);
  }
});

router.get("/signup/pilot", function (req, res, next) {
  res.render("signup/signuppilot");
});

router.post("/signup/pilot", async (req, res, next) => {
  const { email, name, lastname, password } = req.body;
  try {
    const foundPilot = await Pilot.findOne({ email });
    if (foundPilot) {
      //  req.flash("error", "Email already taken");
      req.session.msg = { status: 401, text: "Email already taken." };
      return res.redirect("/signup/pilot");
    }
    // Add some salts just a little
    const salt = 10;
    const hashedPassword = bcrypt.hashSync(password, salt);
    const pilotCreate = await Pilot.create({
      name,
      email,
      lastname,
      password: hashedPassword,
    });
    
    res.redirect(`/profilpilote/${req.sesion.currentUser._id}`);
    //res.redirect(`/profilpilote/${pilotCreate._id}`);
  } catch (err) {
    next(err);
  }
});

router.get("/profilPilot/profil", (req, res) => {
  if (!req.session.currentUser) {
    res.redirect("/signin/pilot");
  } else {
    let pilotCurrent = req.session.currentUser._id;
    res.redirect(`/profilpilote/${pilotCurrent}`);
  }
});

router.get("/profilpilote/:id", async (req, res, next) => {
  const pilot = await Pilot.findById(req.params.id);
  let travel;
  let travelOld;
  let today = new Date().now;
  let today_format = dayjs(today).format("YYYY-MM-DDTHH:mm");
  
  if (!req.session.currentUser){
    res.redirect("");
  }else{
    try {
      travel = await Travel.find({
        $and: [
          { id_Pilote: { $eq: req.session.currentUser._id } },
          { departureTime: { $gte: today_format } },
        ],
      });
    } catch (err) {
      next(err);
    }
    try {
      travelOld = await Travel.find({
        $and: [
          { id_Pilote: { $eq: req.session.currentUser._id } },
          { departureTime: { $lt: today_format } },
        ],
      });
    } catch (err) {
      next(err);
    }
  
    res.render("profilpilot", {
      pilot,
      travel,
      travelOld,
      scripts: ["/javascripts/filterFlightPilote.js"],
    });
  }


  
});

router.get("/profilpilotEdit/:id", async (req, res, next) => {
  try {
    const pilot = await Pilot.findById(req.session.currentUser._id);
    res.render("profilpilotEdit", { pilot });
  } catch (err) {
    next(err);
  }
});

router.post("/profilpilotEdit/:id", async (req, res, next) => {
  try {
    const piloteId = req.params.id;
    const updatePilote = await Pilot.findByIdAndUpdate(piloteId, req.body, {
      new: true,
    });
    res.redirect(`/profilpilote/${piloteId}`);
  } catch (error) {
    next(error); // Sends us to the error handler middleware in app.js if an error occurs
  }
});

router.get("/logout", async (req, res, next) => {
  console.log(req.session.currentUser.id);
  req.session.destroy(function (err) {
    res.redirect("/");
  });
});

module.exports = router;
