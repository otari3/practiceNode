const express = require("express");
const router = express.Router();
const path = require("path");
const rootDir = require("../helpers/path");
const products = require("../controllers/products");

router.get("/", products.getProducts);
module.exports = router;
