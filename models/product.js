const fs = require("fs");
const path = require("path");
const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);
const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, data) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(data));
  });
};
const index = (id, cb) => {
  getProductsFromFile((products) => {
    let index = products.findIndex((item) => {
      return Number(id) === Number(item.id);
    });
    return cb(index, products);
  });
};
module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  save() {
    this.id = Math.random().toString();
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {});
    });
  }
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((items) => {
        return items.id === id;
      });
      return cb(product);
    });
  }
  static updateProduct(body, res) {
    index(body.id, (index, products) => {
      products[index] = {
        title: body.title,
        imageUrl: body.imageUrl,
        description: body.description,
        price: body.price,
        id: body.id,
      };
      fs.writeFile(p, JSON.stringify(products), (err) => {
        return res.redirect("/admin/products");
      });
    });
  }
  static deleteById(id, res) {
    index(id, (index, products) => {
      products.splice(index, 1);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (!err) {
          return res.redirect("/admin/products");
        }
      });
    });
  }
};
