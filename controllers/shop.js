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
  cart.fetchAll((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (let product of products) {
        const cartInProduct = cart.products.find(
          (item) => item.id == product.id
        );
        if (cartInProduct) {
          cartProducts.push({ productData: product, qty: cartInProduct.qty });
        }
      }
      res.render("shop/cart.ejs", {
        pageTitle: "cart",
        path: "/cart",
        products: cartProducts,
      });
    });
  });
};
exports.postCart = (req, res, next) => {
  const id = req.body.productId;
  Product.findById(id, (product) => {
    cart.addProduct(product.id, product.price);
    res.redirect("/cart");
  });
};
exports.deleteCart = (req, res, next) => {
  const id = req.body.id;
  Product.findById(id, (product) => {
    cart.deleteProduct(product.id, product.price);
    res.redirect("/cart");
  });
};
exports.getCheckOut = (req, res, next) => {
  res.render("./shop/checkout.ejs", {
    pageTitle: "checkout",
    path: "/checkout",
  });
};
