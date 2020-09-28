const express = require("express");
const router = new express.Router();
const Pilot = require("../models/Pilote");
const bcrypt = require("bcrypt");


router.get("/signin/pilot", function (req, res, next) {
    res.render("signin/registerPilot");
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
      console.log("Pilot: ",req.session.currentUser);
      res.redirect("/");
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
        await Pilot.create({
            name,
            email,
            lastname,
            password: hashedPassword,
        });
        res.redirect("/");
     } catch (err) {
       next(err);
     }
  });


router.get("/logout", async (req, res, next) => {
    console.log(req.session.currentUser);
    req.session.destroy(function (err) {
      res.redirect("/");
    });
});

module.exports = router;