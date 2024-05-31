const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
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
  this.cart = updatedCart;
  return this.save();
};
userSchema.methods.deleteCart = function (prodId) {
  let updatedCart = this.cart.items.filter((p) => {
    return p._id.toString() !== prodId.toString();
  });
  this.cart.items = updatedCart;
  return this.save();
};
module.exports = mongoose.model("User", userSchema);
// const database = require("../helpers/database").db;
// const mongodb = require("mongodb");
// class User {
//   constructor(username, email, cart, id) {
//     this.username = username;
//     this.email = email;
//     this.cart = cart;
//     this._id = id;
//   }

//   save() {
//     const db = database();
//     return db
//       .collection("users")
//       .insertOne(this)
//       .then((res) => {
//         return res;
//       })
//       .catch((err) => {
//         throw err;
//       });
//   }

//   addToCart(product) {
//     const cartProductIndex = this.cart.items.findIndex((item) => {
//       return item.productId.toString() === product._id.toString();
//     });
//     let qty = 1;
//     const updatedCartItems = [...this.cart.items];
//     if (cartProductIndex >= 0) {
//       qty = this.cart.items[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = qty;
//       updatedCartItems[cartProductIndex].price = qty * product.price;
//     } else {
//       updatedCartItems.push({
//         productId: product._id,
//         quantity: qty,
//         price: product.price,
//       });
//     }

//     const updatedCart = {
//       items: updatedCartItems,
//     };
//     const db = database();
//     return db
//       .collection("users")
//       .updateOne(
//         {
//           _id: this._id,
//         },
//         { $set: { cart: updatedCart } }
//       )
//       .then(() => {
//         return;
//       })
//       .catch((err) => {
//         throw err;
//       });
//   }

//   clearingCart(products) {
//     const db = database();
//     if (products.length <= 0) {
//       this.cart = { items: [] };
//       return db
//         .collection("users")
//         .updateOne(
//           {
//             _id: this._id,
//           },
//           { $set: { cart: { items: [] } } }
//         )
//         .then(() => {
//           return;
//         })
//         .catch((err) => {
//           throw err;
//         });
//     }
//   }
//   getCart() {
//     const db = database();
//     const productsIds = this.cart.items.map((i) => {
//       return i.productId;
//     });
//     return db
//       .collection("products")
//       .find({ _id: { $in: productsIds } })
//       .toArray()
//       .then((products) => {
//         this.clearingCart(products);
//         return products.map((p) => {
//           return {
//             ...p,
//             quantity: this.cart.items.find((i) => {
//               return i.productId.toString() === p._id.toString();
//             }).quantity,
//           };
//         });
//       })
//       .catch((err) => {
//         throw err;
//       });
//   }

//   addOrder() {
//     const db = database();
//     let totalPrice = 0;
//     for (let i = 0; i < this.cart.items.length; i++) {
//       totalPrice += Number(this.cart.items[i].price);
//     }
//     return this.getCart()
//       .then((products) => {
//         const order = {
//           items: products,
//           totalPrice: totalPrice,
//           user: {
//             _id: this._id,
//             username: this.username,
//             email: this.email,
//           },
//         };
//         return db.collection("orders").insertOne({ ...order });
//       })
//       .then(() => {
//         this.cart = { items: [] };
//         return db
//           .collection("users")
//           .updateOne(
//             {
//               _id: this._id,
//             },
//             { $set: { cart: { items: [] } } }
//           )
//           .then(() => {
//             return;
//           })
//           .catch((err) => {
//             throw err;
//           });
//       })
//       .catch((err) => {
//         throw err;
//       });
//   }

//   getOrders() {
//     const db = database();
//     return db.collection("orders").find({ "user._id": this._id }).toArray();
//   }

//   deleteCart(prodId) {
//     const db = database();
//     const newCart = this.cart.items.filter((i) => {
//       return i.productId.toString() !== prodId.toString();
//     });
//     return db
//       .collection("users")
//       .updateOne({ _id: this._id }, { $set: { cart: { items: newCart } } })
//       .then(() => {
//         return;
//       })
//       .catch((err) => {
//         throw err;
//       });
//   }

//   static findById(userId) {
//     const db = database();
//     return db
//       .collection("users")
//       .findOne({ _id: mongodb.ObjectId.createFromHexString(userId) })
//       .then((res) => {
//         return res;
//       })
//       .catch((err) => {
//         throw err;
//       });
//   }
// }

// module.exports = User;
