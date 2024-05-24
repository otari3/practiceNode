const mongoConect = require("../helpers/database");
class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }
  save() {
    const db = mongoConect.db();
    return db
      .collection("products")
      .insertOne(this)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }
  static fetchAll() {
    const db = mongoConect.db();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = Product;
