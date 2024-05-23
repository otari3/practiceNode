const express = require("express");
const router = express.Router();
const path = require("path");

const productController = require("../controllers/admin");

router.get("/add-product", productController.getAddProduct);
router.get("/products", productController.getProducts);
router.post("/delete-product", productController.deleteProduct);
router.post("/add-product", productController.postProduct);
router.post("/edit-product", productController.postEditProduct);
router.get("/edit-product/:id", productController.getEditProduct);
module.exports = { router };
