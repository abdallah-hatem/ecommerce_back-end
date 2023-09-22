import checkAuth from "../../middleware/checkAuth";
import checkNotAuth from "../../middleware/checkNotAuth";
import checkAdmin from "../../middleware/checkAdmin";

const express = require("express");

const {
  getAllCarts,
  createCart,
  updateCart,
  emptyCart,
  getCartById,
  addToCart,
} = require("./controller");

const router = express.Router();

router.route("/cart").get(checkAuth, checkAdmin, getAllCarts);
// .post(checkAuth, createCart);

router
  .route("/cart/:id")
  .get(checkAuth, getCartById)
  .delete(checkAuth, emptyCart)
  // .put(checkAuth, updateCart)
  .put(checkAuth, addToCart);

module.exports = router;

export {};
