const express = require("express");
const router = new express.Router();
const Pilot = require("../models/Pilote");
const bcrypt = require("bcrypt");


router.get("/signin/pilot", function (req, res, next) {
    res.render("signin/signinpilot");
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
module.exports = router;
