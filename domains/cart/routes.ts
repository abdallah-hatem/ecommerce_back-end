import checkAuth from "../../middleware/checkAuth";
import checkNotAuth from "../../middleware/checkNotAuth";
import checkAdmin from "../../middleware/checkAdmin";

const express = require("express");

const {
  getAllCarts,
  createCart,
  updateCart,
  emptyCart,
  getCartByUserId,
  addToCart,
} = require("./controller");

const router = express.Router();

router.route("/cart").get(checkAuth, checkAdmin, getAllCarts);
// .post(checkAuth, createCart);

router
  .route("/cart/:id")
  .get(checkAuth, getCartByUserId)
  .delete(checkAuth, emptyCart)
  .put(checkAuth, addToCart);
// .put(checkAuth, updateCart)

module.exports = router;

export {};
