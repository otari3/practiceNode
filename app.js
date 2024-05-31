const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const mongoConnect = require("./helpers/database");
const User = require("./models/users");
const mongoose = require("mongoose");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const wrongPage = require("./controllers/wrongPage");
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  User.findById("6659b335866f4ca9e020320c")
    .then((users) => {
      req.user = users;
      next();
    })
    .catch((err) => {
      throw err;
    });
});

app.use("/admin", adminRoutes.router);
app.use(shopRoutes);
app.use(wrongPage.wrongPage);
mongoose
  .connect(
    "mongodb+srv://oto:tvali333@cluster0.azczi3n.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((res) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "oto",
          email: "test@mail.ru",
          cart: {
            items: [],
          },
        });
        user
          .save()
          .then((res) => {})
          .catch((err) => {
            throw err;
          });
      }
    });
    app.listen(3000);
  })
  .catch((err) => {
    throw err;
  });
