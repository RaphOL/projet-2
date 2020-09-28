require("dotenv").config();
require("./config/mongodb"); // database initial setup

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");


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


app.use("/", require("./routes/index"));
app.use("/", require("./routes/users"));
app.use("/", require("./routes/authPilote"));
app.use("/", require("./routes/authUser"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// routers


module.exports = app;
