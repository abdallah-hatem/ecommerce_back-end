const express = require("express");
const router = express.Router();

const userRoutes = require("../domains/user");
const productsRoutes = require("../domains/products");
const categoriesRoutes = require("../domains/categories");

router.use(userRoutes);
router.use(productsRoutes);
router.use(categoriesRoutes);

module.exports = router;
export {};
