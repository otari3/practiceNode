const Product = require("../models/product");
const cart = require("../models/cart");
exports.home = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("./shop/index.ejs", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("./shop/product-list.ejs", {
      prods: products,
      pageTitle: "products",
      path: "/products",
    });
  });
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("./shop/product-detail", {
      product: product,
      pageTitle: "product details",
      path: "/products/details",
    });
  });
};
exports.getCart = (req, res, next) => {
  res.render("shop/cart.ejs", {
    pageTitle: "cart",
    path: "/cart",
  });
};
exports.postCart = (req, res, next) => {
  const id = req.body.productId;
  Product.findById(id, (product) => {
    cart.addProduct(product.id, product.price);
    res.redirect("/cart");
  });
};
exports.getCheckOut = (req, res, next) => {
  res.render("./shop/checkout.ejs", {
    pageTitle: "checkout",
    path: "/checkout",
  });
};
