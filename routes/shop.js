const express = require("express");
const router = express.Router();
const products = require("../controllers/shop");

router.get("/", products.home);
router.get("/products", products.getProducts);
router.get("/products/:productId", products.getProduct);
router.get("/cart", products.getCart);
router.post("/cart", products.postCart);
router.get("/checkout", products.getCheckOut);
module.exports = router;
