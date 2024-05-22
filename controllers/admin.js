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
    req.body.imageUrl,
    req.body.description,
    req.body.price
  );
  product.save();
  res.redirect("/");
};
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("./admin/products.ejs", {
      prods: products,
      pageTitle: "admin Products",
      path: "/admin/products",
    });
  });
};
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const id = req.params.id;
  if (!editMode) {
    return res.redirect("/");
  } else {
    Product.findById(id, (product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("./admin/edit-product.ejs", {
        pageTitle: "Products",
        path: "/admin//edit-product",
        editing: editMode,
        product: product,
      });
    });
  }
};
exports.postEditProduct = (req, res, next) => {
  Product.updateProduct(req.body, res);
};
