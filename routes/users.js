var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/signin/user", function (req, res, next) {
  res.render("signin/signinuser");
});

router.get("/signup/user", function (req, res, next) {
  res.render("signup/signupuser");
});

module.exports = router;
