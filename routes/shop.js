const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../helpers/path");
const adminData = require("./admin");

router.get("/", (req, res, next) => {
  // console.log(products.products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  const products = adminData.products;
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
  });
});
module.exports = router;
