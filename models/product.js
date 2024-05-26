const mongoConect = require("../helpers/database");
const mongodb = require("mongodb");
class Product {
  constructor(title, price, description, imageUrl, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.userId = userId;
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
  static findById(prodId) {
    const db = mongoConect.db();
    return db
      .collection("products")
      .find({ _id: mongodb.ObjectId.createFromHexString(prodId) })
      .next()
      .then((product) => {
        return product;
      })
      .catch((err) => {
        throw err;
      });
  }
  static updateProduct(prodId, body, userId) {
    const db = mongoConect.db();
    return db
      .collection("products")
      .updateOne(
        { _id: prodId },
        {
          $set: {
            _id: prodId,
            title: body.title,
            price: body.price,
            description: body.description,
            imageUrl: body.imageUrl,
            userId: userId,
          },
        }
      )
      .then(() => {
        return;
      })
      .catch((err) => {
        throw err;
      });
  }
  static deleteById(id) {
    const db = mongoConect.db();
    return db
      .collection("products")
      .deleteOne({ _id: id })
      .then(() => {
        return;
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = Product;
