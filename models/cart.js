const fs = require("fs");
const path = require("path");
const p = path.join(path.dirname(require.main.filename), "data", "cart.json");
module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, data) => {
      let carts = { products: [], totalPrice: 0 };
      if (!err) {
        carts = JSON.parse(data);
      }
      const existingProductIndex = carts.products.findIndex((prod) => {
        return prod.id === id;
      });
      const existingProduct = carts.products[existingProductIndex];
      let updetedProduct;
      if (existingProduct) {
        updetedProduct = { ...existingProduct };
        updetedProduct.qty = updetedProduct.qty + 1;
        carts.products = [...carts.products];
        carts.products[existingProductIndex] = updetedProduct;
      } else {
        updetedProduct = { id: id, qty: 1 };
        carts.products = [...carts.products, updetedProduct];
      }
      carts.totalPrice = Math.round(
        Number(carts.totalPrice) + Number(productPrice)
      );
      fs.writeFile(p, JSON.stringify(carts), (err) => {});
    });
  }
  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, data) => {
      if (err) {
        return;
      }
      const cart = JSON.parse(data);
      if (cart.products.length <= 0) {
        return;
      }
      let index = cart.products.findIndex((items) => {
        return Number(id) === Number(items.id);
      });
      let priceMinus = cart.products[index].qty * productPrice;
      cart.totalPrice -= priceMinus;
      cart.products.splice(index, 1);
      fs.writeFile(p, JSON.stringify(cart), (err) => {});
    });
  }
  static fetchAll(cb) {
    fs.readFile(p, (err, data) => {
      if (!err) {
        cb(JSON.parse(data));
      }
    });
  }
};
