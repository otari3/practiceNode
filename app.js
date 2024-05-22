const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const wrongPage = require("./controllers/wrongPage");
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin", adminRoutes.router);
app.use(shopRoutes);
app.use(wrongPage.wrongPage);
app.listen(3000);
