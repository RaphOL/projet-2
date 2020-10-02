const express = require("express");
const router = new express.Router();
const User = require("../models/usermodel");
const travel = require("../models/travelmodel");
const bcrypt = require("bcrypt");

const salt = 10;

router.get("/signin/user", function (req, res, next) {
  res.render("signin/signinuser");
});

router.get("/profiluser/profil", (req, res) => {
  if (!req.session.currentUser) {
    res.redirect("/signin/user");
  }

  let userCurrent = req.session.currentUser._id;
  res.redirect(`/profiluser/${userCurrent}`);
});

router.post("/signin/user", async (req, res, next) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email: email });
  if (!foundUser) {
    req.flash("error", "Invalid credentials");
    res.redirect("/signin/user");
  } else {
    const isSamePassword = bcrypt.compareSync(password, foundUser.password);
    if (!isSamePassword) {
      req.flash("error", "Invalid credentials");
      res.redirect("/signin/user");
    } else {
      const userDocument = { ...foundUser };
      const userObject = foundUser.toObject();
      delete userObject.password;

      req.session.currentUser = userObject;

      req.flash("success", "Successfully logged in...");
      res.redirect(`/profiluser/${req.session.currentUser._id}`);
    }
  }
});

router.get("/signup/user", function (req, res, next) {
  res.render("signup/signupuser");
});

router.get("/profiluser/:id", async (req, res, next) => {
  try {
    const myUser = req.params.id;
    const travelInfo = await travel.find({
      id_user: { $eq: req.session.currentUser._id },
    });
    const userInfo = await User.findById(myUser);
    res.render("profiluser", { user: userInfo, travelOld: travelInfo });
  } catch (err) {
    next(err);
  }
});

router.post("/signup/user", async (req, res, next) => {
  try {
    const newUser = req.body;

    const foundUser = await User.findOne({ email: newUser.email });

    if (foundUser) {
      res.render("signup/signupuser", { error: "Email already taken" });
    } else {
      const hashedPassword = bcrypt.hashSync(newUser.password, salt);
      newUser.password = hashedPassword;
      const user = await User.create(newUser);

      
      req.session.currentUser = user;
      res.redirect(`/profiluser/${user._id}`);
      //res.redirect("/signin/user");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/logout", async (req, res, next) => {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
});

module.exports = router;
