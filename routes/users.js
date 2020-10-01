var express = require("express");
var router = express.Router();
const User = require("../models/usermodel");
const travelModel = require("../models/travelmodel");
const protectPrivateRoute = require("../middlewares/protectPrivateRoute");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get(
  "/profiluserEdit/:id",
  protectPrivateRoute,
  async (req, res, next) => {
    console.log("toto");
    // try {
    //   const userOne = await User.find();
    //   const userId = req.params.id;
    //   dbresult = await User.findById(userId);
    //   User.findByIdAndUpdate(userId);
    //   console.log(userOne);
    res.render("profiluserEdit");
    // } catch (error) {
    //   next(error);
    // }
  }
);

router.post(
  "/profiluserEdit/:id",
  protectPrivateRoute,
  async (req, res, next) => {
    console.log("tot");
    try {
      const userId = req.params.id;
      const updatedUser = await User.findByIdAndUpdate(userId, req.body);
      res.redirect(`/profiluser/${req.session.currentUser._id}`);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/delete/:id", async (req, res, next) => {
  try {
    const user = await travelModel.findByIdAndUpdate(req.params.id);
  } catch (err) {
    next(err);
  }
  res.redirect(`/profiluser/${req.session.currentUser._id}`);
});

module.exports = router;
