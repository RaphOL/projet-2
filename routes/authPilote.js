const express = require("express");
const router = new express.Router();
const Pilot = require("../models/Pilote");
const bcrypt = require("bcrypt");


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
         req.flash("error", "Invalid credentials");  // If you wanted to use flash you could aswell, you would have to handle i
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
        const foundPilot = await Pilot.findOne({email});
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
       res.redirect(`/profilpilote/${pilotCreate._id}`);
     } catch (err) {
       next(err);
     }
  });

  router.get("/profilpilote/:id", async (req, res, next) => {
    const pilot = req.params.id;

    res.render("profilpilot", { pilot});
  });

  router.get("/profilpilotEdit/:id", async (req, res, next) => {
    const pilot = req;
   
  //  const pilotInfo = await Pilot.findById(pilot);
    console.log("<<<<<>>>>><<<>>>||||||=====> ",   req.session.currentUser);
    res.render("profilpilotEdit", { pilot: req.session.currentUser });
  });

  router.post("/profilpilotEdit/:id", async (req, res, next) => {
    try {
        const piloteId = req.params.id;
        const updatePilote = await Games.findByIdAndUpdate(piloteId, req.body);
        res.redirect(`/profilpilote/${piloteId}`);
      } catch (error) {
        next(error); // Sends us to the error handler middleware in app.js if an error occurs
      }
  });



router.get("/logout", async (req, res, next) => {
    console.log(req.session.currentUser);
    req.session.destroy(function (err) {
      res.redirect("/");
    });
});

module.exports = router;