module.exports = function protectPrivateRoute(req, res, next) {
  console.log("pouet");
  if (req.session.currentUser) next();
  else res.redirect("/");
};
