var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/about", function (req, res, next) {
  res.render("about");
});

router.get("/signin/signinuser", function (req, res, next) {
  res.render("signin/user");
});

router.get("/signup/signupuser", function (req, res, next) {
  res.render("signup/user");
});

module.exports = router;
