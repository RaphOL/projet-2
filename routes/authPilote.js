const express = require("express");
const router = new express.Router();
const Pilote = require("../models/Pilote");
const bcrypt = require("bcrypt");
function test() {
  console.log("pouet");
}

test();

router.get("/signin/pilot", (req, res) => {
  res.send("Pilote!!");
});



module.exports = router;


