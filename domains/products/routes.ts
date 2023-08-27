import checkAuth from "../../middleware/checkAuth";
import checkNotAuth from "../../middleware/checkNotAuth";

const express = require("express");

const { getAllProducts, createProduct } = require("./controller");

const router = express.Router();

router.route("/product").get(getAllProducts).post(createProduct);

module.exports = router;

export {};
