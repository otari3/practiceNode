const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const mongoConnect = require("./helpers/database");
const User = require("./models/users");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const wrongPage = require("./controllers/wrongPage");
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  User.findById("66524e17580cfcee1ed0a7d5")
    .then((users) => {
      req.user = new User(users.username, users.email, users.cart, users._id);
      next();
    })
    .catch((err) => {
      throw err;
    });
});

app.use("/admin", adminRoutes.router);
app.use(shopRoutes);
app.use(wrongPage.wrongPage);
mongoConnect.mango(() => {
  app.listen(3000);
});
