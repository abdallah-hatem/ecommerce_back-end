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
} = require("./controller");

const router = express.Router();

router
  .route("/cart")
  .get(checkAuth, checkAdmin, getAllCarts)
  // .post(checkAuth, createCart);

router
  .route("/cart/:id")
  .get(checkAuth, getCartById)
  .delete(checkAuth, emptyCart)
  .put(checkAuth, updateCart)

module.exports = router;

export {};
