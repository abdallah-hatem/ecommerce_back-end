import checkAuth from "../../middleware/checkAuth";
import checkNotAuth from "../../middleware/checkNotAuth";

const express = require("express");

const {
  getAllCarts,
  createCart,
  updateCart,
  deleteCart,
  getCartById,
} = require("./controller");

const router = express.Router();

router.route("/cart").get(getAllCarts).post(createCart);

router.route("/cart/:id").get(getCartById).delete(deleteCart).put(updateCart);

module.exports = router;

export {};
