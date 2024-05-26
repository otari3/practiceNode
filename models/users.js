const database = require("../helpers/database").db;
const mongodb = require("mongodb");
class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = database();
    return db
      .collection("users")
      .insertOne(this)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }
  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((item) => {
      return item.productId.toString() === product._id.toString();
    });
    let qty = 1;
    const updatedCartItems = [...this.cart.items];
    if (cartProductIndex >= 0) {
      qty = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = qty;
      updatedCartItems[cartProductIndex].price = qty * product.price;
    } else {
      updatedCartItems.push({
        productId: product._id,
        quantity: qty,
        price: product.price,
      });
    }

    const updatedCart = {
      items: updatedCartItems,
    };
    const db = database();
    return db
      .collection("users")
      .updateOne(
        {
          _id: this._id,
        },
        { $set: { cart: updatedCart } }
      )
      .then(() => {
        return;
      })
      .catch((err) => {
        throw err;
      });
  }

  getCart() {
    const db = database();
    const productsIds = this.cart.items.map((i) => {
      return i.productId;
    });
    return db
      .collection("products")
      .find({ _id: { $in: productsIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((i) => {
              return i.productId.toString() === p._id.toString();
            }).quantity,
          };
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  addOrder() {
    const db = database();
    let totalPrice = 0;
    for (let i = 0; i < this.cart.items.length; i++) {
      totalPrice += Number(this.cart.items[i].price);
    }
    return db
      .collection("orders")
      .insertOne({ ...this.cart, totalPrice: totalPrice })
      .then(() => {
        this.cart = { items: [] };
        return db
          .collection("users")
          .updateOne(
            {
              _id: this._id,
            },
            { $set: { cart: { items: [] } } }
          )
          .then(() => {
            return;
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  }

  deleteCart(prodId) {
    const db = database();
    const newCart = this.cart.items.filter((i) => {
      return i.productId.toString() !== prodId.toString();
    });
    return db
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { cart: { items: newCart } } })
      .then(() => {
        return;
      })
      .catch((err) => {
        throw err;
      });
  }

  static findById(userId) {
    const db = database();
    return db
      .collection("users")
      .findOne({ _id: mongodb.ObjectId.createFromHexString(userId) })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = User;
