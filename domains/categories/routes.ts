import checkAuth from "../../middleware/checkAuth";
import checkNotAuth from "../../middleware/checkNotAuth";

const express = require("express");

const { getAllCategories, createCategory } = require("./controller");

const router = express.Router();

router.route("/categories").get(getAllCategories).post(createCategory);

module.exports = router;

export {};
