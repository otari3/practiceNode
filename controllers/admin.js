const Product = require("../models/product");
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
    req.body.imageUrl
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
exports.getProducts = (req, res, next) => {};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const id = req.params.id;
};
exports.postEditProduct = (req, res, next) => {};
exports.deleteProduct = (req, res, next) => {};
