import checkAuth from "../../middleware/checkAuth";
import checkNotAuth from "../../middleware/checkNotAuth";

const express = require("express");

const { getAllProducts } = require("./controller");

const router = express.Router();

router.route("/product").get(checkAuth, getAllProducts);

module.exports = router;

export {};
