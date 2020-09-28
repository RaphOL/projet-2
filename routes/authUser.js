const express = require("express");
const router = new express.Router();
const User = require("../models/usermodel");
const bcrypt = require("bcrypt");

const salt = 10;

router.get("/signin/user", function (req, res, next) {
  res.render("signin/signinuser");
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
      console.log(userDocument);
      const userObject = foundUser.toObject();
      delete userObject.password;

      req.session.currentUser = userObject;

      req.flash("success", "Successfully logged in...");
      res.redirect("/profiluser");
    }
  }
});

router.get("/signup/user", function (req, res, next) {
  res.render("signup/signupuser");
});

router.get("/profiluser", function (req, res, next) {
  res.render("profiluser");
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
      res.redirect("/profiluser");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/logout", async (req, res, next) => {
  console.log(req.session.currentUser);
  req.session.destroy(function (err) {
    res.redirect("/signin/user");
  });
});

module.exports = router;
