import checkAuth from "../../middleware/checkAuth";
import checkNotAuth from "../../middleware/checkNotAuth";

const express = require("express");

const {

} = require("./controller");

const router = express.Router();

// router.route("/categories").get(getAllCategories).post(createCategory);
// router.route("/categories/:id").delete(deleteCategory).put(updateCategory);

module.exports = router;

export {};
