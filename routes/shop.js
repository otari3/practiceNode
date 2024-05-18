const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../helpers/path");
const products = require("./admin");

router.get("/", (req, res, next) => {
  // console.log(products.products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  res.render("shop");
});
module.exports = router;
