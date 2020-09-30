const express = require("express");
const router = express.Router();
const travelModel = require("../models/travelmodel");

router.get("/", async (req, res, next) => {
  try {
    const dbRes = await travelModel.find(req.body);
    console.log(dbRes);
    res.render("/", { flights: dbRes });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
