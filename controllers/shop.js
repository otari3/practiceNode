const Product = require("../models/product");
const cart = require("../models/cart");
const User = require("../models/users");
const Orders = require("../models/orders");
exports.home = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("./shop/index.ejs", {
        prods: products,
        path: "/",
        pageTitle: "home",
        isLogIn: req.session.isLogedIn
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
        isLogIn: req.session.isLogedIn
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
        isLogIn: req.session.isLogedIn
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
    isLogIn: req.session.isLogedIn
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
      isLogIn: req.session.isLogedIn
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
    isLogIn: req.session.isLogedIn
  });
};
exports.postOrders = (req, res, next) => {
  req.user.populate("cart.items.productId").then((p) => {
    let products = p.cart.items.map((i) => {
      return { product: { ...i.productId._doc }, quantity: i.quantity };
    });
    const order = new Orders({
      products: products,
      user: {
        name: req.user.name,
        userId: req.user._id,
      },
    });
    order.save().then(() => {
      req.user.clearCart();
      res.redirect("/cart");
    });
  });
};
exports.getOrder = (req, res, next) => {
  Orders.find({ "user.userId": req.user._id }).then((orders) => {
    console.log(orders);
    res.redirect("/cart");
  });
};
