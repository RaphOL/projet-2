const express = require("express");
const router = new express.Router();
const Pilote = require("../models/Pilote");
const bcrypt = require("bcrypt");

console.log("pouet");


router.get("/signin/pilot", function (req, res, next) {
    res.render("signin/signinpilot");
  });
  
  router.get("/signup/pilot", function (req, res, next) {
    res.render("signup/signuppilot");
  });

module.exports = router;
