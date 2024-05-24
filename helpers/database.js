const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

let _db;

const mongoConect = (cb) => {
  mongoClient
    .connect(
      "mongodb+srv://oto:tvali333@cluster0.azczi3n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then((res) => {
      _db = res.db("shop");
      cb();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getdb = () => {
  if (_db) {
    return _db;
  }
  throw "no data base";
};
exports.mango = mongoConect;
exports.db = getdb;
