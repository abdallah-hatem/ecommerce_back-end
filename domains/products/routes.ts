import checkAuth from "../../middleware/checkAuth";
import checkNotAuth from "../../middleware/checkNotAuth";

const express = require("express");

const {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("./controller");

const router = express.Router();

router.route("/product").get(getAllProducts).post(createProduct);
router.route("/product/:id").delete(deleteProduct).put(updateProduct);

module.exports = router;

export {};
