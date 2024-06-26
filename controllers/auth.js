const User = require("../models/users");
exports.getSingUp = (req, res, next) => {
  res.render("./shop/users.ejs", {
    pageTitle: "Userlogin",
    path: "/userlogin",
    isLogIn: req.session.isLogedIn,
  });
};

exports.login = (req, res, next) => {
  User.findById("6659b335866f4ca9e020320c")
    .then((users) => {
      req.session.isLogedIn = true;
      req.session.user = users;
      res.redirect("/");
    })
    .catch((err) => {
      throw err;
    });
};
exports.logout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
