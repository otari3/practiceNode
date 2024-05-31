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
  let title = req.body.title;
  let price = req.body.price;
  let description = req.body.description;
  let imageUrl = req.body.imageUrl;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
  });
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
  Product.find()
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
  let title = req.body.title;
  let price = req.body.price;
  let description = req.body.description;
  let imageUrl = req.body.imageUrl;
  Product.findById(req.body.id)
    .then((product) => {
      product.title = title;
      product.price = price;
      product.description = description;
      product.imageUrl = imageUrl;
      return product.save();
    })
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      throw err;
    });
};
exports.deleteProduct = (req, res, next) => {
  const id = req.body.id;
  Product.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      throw err;
    });
};
