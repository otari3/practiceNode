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
    res.render("./shop/shop.ejs", {
      prods: products,
      pageTitle: "products",
      path: "/products",
    });
  });
};
exports.getCart = (req, res, next) => {
  res.render("./shop/cart.ejs", {
    pageTitle: "cart",
    path: "/cart",
  });
};
exports.getCheckOut = (req, res, next) => {
  res.render("./shop/checkout.ejs", {
    pageTitle: "checkout",
    path: "/checkout",
  });
};

exports.getProductDetails = (req, res, next) => {
  res.render("./shop/product-detail", {
    pageTitle: "product-detail",
    path: "/product-detail",
  });
};
