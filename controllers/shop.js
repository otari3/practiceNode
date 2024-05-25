const Product = require("../models/product");
const cart = require("../models/cart");
exports.home = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("./shop/index.ejs", {
        prods: products,
        path: "/",
        pageTitle: "home",
      });
    })
    .catch((err) => {
      throw err;
    });
};
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("./shop/product-list.ejs", {
        prods: products,
        path: "/products",
        pageTitle: "products",
      });
    })
    .catch((err) => {
      throw err;
    });
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render("./shop/product-detail.ejs", {
        product: product,
        path: "/details",
        pageTitle: "details",
      });
    })
    .catch((err) => {
      throw err;
    });
};
exports.getCart = (req, res, next) => {};
exports.postCart = (req, res, next) => {};
exports.deleteCart = (req, res, next) => {};
exports.getCheckOut = (req, res, next) => {
  res.render("./shop/checkout.ejs", {
    pageTitle: "checkout",
    path: "/checkout",
  });
};
