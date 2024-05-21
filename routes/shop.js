const express = require("express");
const router = express.Router();
const products = require("../controllers/products");

router.get("/", products.home);
router.get("/products", products.getProducts);
router.get("/cart", products.getCart);
router.get("/checkout", products.getCheckOut);
router.get("/product-detail", products.getProductDetails);
module.exports = router;
