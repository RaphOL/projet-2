require("dotenv").config();
require("./config/mongodb"); // database initial setup

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const Pilot = require("./models/Pilote");

var app = express();

/////////////////////////////

const hbs = require("hbs");
const mongoose = require("mongoose");
//Can be util later keep that
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");

// view engine setup
// initial config
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
hbs.registerPartials(__dirname + "/views/partials");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 600000 }, // in millisec
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60, // 1 day
    }),
    saveUninitialized: true,
    resave: true,
  })
);



app.use(flash());

async function checkloginStatus(req, res, next) {
  res.locals.user = req.session.currentUser ? req.session.currentUser : null;

  // access this value @ {{user}} or {{user.prop}} in .hbs
  res.locals.isLoggedIn = Boolean(req.session.currentUser);


  let  isPilotUser;

  if(res.locals.user){
    let checkUser = res.locals.user._id;
    try{
      res.locals.isPilotUser = Boolean(await Pilot.findById(checkUser));
    } catch {
      res.locals.isPilotUser = false;
    }
  }
  
  // access this value @ {{isLoggedIn}} in .hbs
  next(); // continue to the requested route
}



// Custom connect-flash (req.flash) middleware.
function eraseSessionMessage() {
  // Closure time baby.
  var count = 0; // initialize counter in parent scope and use it in inner function
  return function (req, res, next) {

    if (req.session.msg) {
      // only increment if session contains msg
      if (count) {
        // if count greater than 0
        count = 0; // reset counter
        req.session.msg = null; // reset message
      }
      res.locals.msg = req.session.msg; // expose msg to the views ! => you can access it with {{msg}}
      ++count; // increment counter
    }
    next(); // continue to the requested route
  };
}


app.use(require("./middlewares/exposeFlashMessage"));
app.use(checkloginStatus);
app.use(eraseSessionMessage());

app.use("/", require("./routes/index"));
app.use("/", require("./routes/users"));
app.use("/", require("./routes/authPilote"));
app.use("/", require("./routes/authUser"));
app.use("/travel/", require("./routes/travel"));
// app.use("/", require("./routes/searchFlight"));

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
