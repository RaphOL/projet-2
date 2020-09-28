const express = require("express");
const router = new express.Router();
const Pilote = require("../models/Pilote");
const bcrypt = require("bcrypt");

router.get("/signin", (req, res) => {
  res.send("Pilote!!");
});


module.exports = router;