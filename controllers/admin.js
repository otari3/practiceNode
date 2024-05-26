const Product = require("../models/product");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
exports.getAddProduct = (req, res, next) => {
  res.render("./admin/edit-product.ejs", {
    pageTitle: "Products",
    path: "/admin/add-product",
    product: {},
    editing: false,
  });
};
exports.postProduct = (req, res, next) => {
  const product = new Product(
    req.body.title,
    req.body.price,
    req.body.description,
    req.body.imageUrl,
    req.user._id
  );
  product
    .save()
    .then((responce) => {
      res.redirect("/");
    })
    .catch((err) => {
      throw err;
    });
};
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("./admin/products.ejs", {
        prods: products,
        path: "/admin/products",
        pageTitle: "admin products",
      });
    })
    .catch((err) => {
      throw err;
    });
};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const id = req.params.id;
  if (!editMode) {
    return res.redirect("/");
  }
  Product.findById(id)
    .then((product) => {
      res.render("./admin/edit-product.ejs", {
        pageTitle: "Products",
        path: "/admin/add-product",
        product: product,
        editing: editMode,
      });
    })
    .catch((err) => {
      throw err;
    });
};
exports.postEditProduct = (req, res, next) => {
  Product.updateProduct(
    ObjectId.createFromHexString(req.body.id),
    req.body,
    req.user._id
  )
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      throw err;
    });
};
exports.deleteProduct = (req, res, next) => {
  const id = ObjectId.createFromHexString(req.body.id);
  Product.deleteById(id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      throw err;
    });
};
