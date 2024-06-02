const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const mongoConnect = require("./helpers/database");
const User = require("./models/users");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: "mongodb+srv://oto:tvali333@cluster0.azczi3n.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0",
  collection: "mySessions",
});

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const wrongPage = require("./controllers/wrongPage");
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use((req, res, next) => {
  if (req.session.user) {
    User.findById(req.session.user._id)
      .then((users) => {
        req.user = users;
        next();
      })
      .catch((err) => {
        throw err;
      });
  } else {
    next();
  }
});
app.use(auth);
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
