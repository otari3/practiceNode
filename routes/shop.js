const express = require("express");
const router = express.Router();
const products = require("../controllers/shop");

router.get("/", products.home);
router.get("/products", products.getProducts);
router.get("/products/:productId", products.getProduct);
router.get("/cart", products.getCart);
router.post("/cart", products.postCart);
router.post("/cart-delete-item", products.deleteCart);
router.get("/checkout", products.getCheckOut);
router.get("/userlogin", products.getSingUp);
router.post("/userlogin", products.postUser);
router.post("/create-orders", products.postOrders);
router.get("/orders", products.getOrder);
module.exports = router;
