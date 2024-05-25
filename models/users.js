const database = require("../helpers/database").db;
class User {
  constructor(username, email) {
    (this.username = username), (this.email = email);
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
  static findById(userId) {}
}

module.exports = User;
