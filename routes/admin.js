const express = require("express");
const router = express.Router();
const path = require("path");

const productController = require("../controllers/admin");

router.get("/add-product", productController.getAddProduct);
router.get("/products", productController.getProducts);
router.post("/add-product", productController.postProduct);
module.exports = { router };
