const Product = require("../models/product");
const cart = require("../models/cart");
const User = require("../models/users");
exports.home = (req, res, next) => {
  Product.find()
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
  Product.find()
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
exports.getSingUp = (req, res, next) => {
  res.render("./shop/users.ejs", {
    pageTitle: "Userlogin",
    path: "/userlogin",
  });
};
exports.postUser = (req, res, next) => {
  const user = new User(req.body.username, req.body.email);
  user
    .save()
    .then((r) => {
      res.redirect("/");
    })
    .catch((err) => {
      throw err;
    });
};
exports.getCart = (req, res, next) => {
  req.user.populate("cart.items.productId").then((p) => {
    let products = p.cart.items;
    res.render("./shop/cart.ejs", {
      pageTitle: "cart",
      path: "/cart",
      products: products,
    });
  });
};
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId).then((product) => {
    return req.user
      .addToCart(product)
      .then(() => {
        res.redirect("/cart");
      })
      .catch((err) => {
        throw err;
      });
  });
};
exports.deleteCart = (req, res, next) => {
  req.user
    .deleteCart(req.body.id)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      throw err;
    });
};
exports.getCheckOut = (req, res, next) => {
  res.render("./shop/checkout.ejs", {
    pageTitle: "checkout",
    path: "/checkout",
  });
};
exports.postOrders = (req, res, next) => {
  req.user
    .addOrder()
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      throw err;
    });
};
exports.getOrder = (req, res, next) => {
  req.user
    .getOrders()
    .then((orders) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      throw err;
    });
};
