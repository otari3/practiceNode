const Product = require("../models/product");
exports.getAddProduct = (req, res, next) => {
  res.render("./admin/add-product", {
    pageTitle: "Products",
    path: "/admin/add-product",
  });
};
exports.postProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};
