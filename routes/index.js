var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/about", function (req, res, next) {
  res.render("about");
});

router.get("/signin/user", function (req, res, next) {
  res.render("signin/signinuser");
});

router.get("/signup/user", function (req, res, next) {
  res.render("signup/signupuser");
});


router.get("/signin/pilote", function(req, res, next) {
  res.resnder("signin/singinpilote");
});

router.get("/signup/pilote", function(req, res, next) {
  res.resnder("signup/singinuppilote");
});



module.exports = router;
