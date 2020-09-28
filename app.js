require ("dotenv"). config ();
require ("./ config / mongodb"); // configuration initiale de la base de données

var createError = require ("http-errors");
var express = require ("express");
var chemin = require ("chemin");
var cookieParser = require ("cookie-parser");
var logger = require ("morgan");
var indexRouter = require ("./ routes / index");
var usersRouter = require ("./ routes / users");
var app = express ();

///////////////////////////////

const hbs = require ("hbs");
const mongoose = require ("mangouste");
// Peut être utilisé plus tard garder ça
// session const = require ("session express");
// const MongoStore = require ("connect-mongo") (session);

// voir la configuration du moteur
// configuration initiale
app.set ("vues", path.join (__ dirname, "vues"));
app.set ("moteur de vue", "hbs");
app.set ("vues", __dirname + "/ vues");
hbs.registerPartials (__ dirname + "/ views / partials");

app.use (logger ("dev"));
app.use (express.json ());
app.use (express.urlencoded ({extended: false}));
app.use (cookieParser ());
app.use (express.static (path.join (__ dirname, "public")));

app.use ("/", indexRouter);
app.use ("/ utilisateurs", usersRouter);

// attraper 404 et transmettre au gestionnaire d'erreurs
app.use (function (req, res, next) {
  suivant (createError (404));
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