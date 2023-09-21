import checkAuth from "../../middleware/checkAuth";
import checkNotAuth from "../../middleware/checkNotAuth";
import checkAdmin from "../../middleware/checkAdmin";

const express = require("express");

const {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} = require("./controller");

const router = express.Router();

router
  .route("/categories")
  .get(checkAuth, getAllCategories)
  .post(checkAuth, checkAdmin, createCategory);

router
  .route("/categories/:id")
  .delete(checkAuth, checkAdmin, deleteCategory)
  .put(checkAuth, checkAdmin, updateCategory);

module.exports = router;

export {};
