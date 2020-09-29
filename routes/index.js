var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/about", function (req, res, next) {
  res.render("about");
});

router.get("/add", function (req, res, next) {
  res.render("addFlight");
});

router.get("/search", function (req, res, next) {
  res.render("searchFlight");
});

module.exports = router;
