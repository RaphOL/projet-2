require("dotenv").config();
require("./config/mongodb"); // database initial setup

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
// var piloteRouter = require("./routes/pilote");
var app = express();

/////////////////////////////

const hbs = require("hbs");
const mongoose = require("mongoose");
//Can be util later keep that
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

// view engine setup
// initial config
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
hbs.registerPartials(__dirname + "/views/partials");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/pilote", piloteRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// gestionnaire d'erreurs
app.use (function (err, req, res, next) {
  // définir les locaux, ne fournissant qu'une erreur de développement
  res.locals.message = err.message;
  res.locals.error = req.app.get ("env") === "développement"? err: {};

  // rendre la page d'erreur
  res.status (err.status || 500);
  res.render ("erreur");
});

// routeurs
app.use ("/", require ("./ routes / index"));
app.use ("/", require ("./ routes / users"));

module.exports = application;