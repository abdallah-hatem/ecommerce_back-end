const express = require("express");
const router = express.Router();

const userRoutes = require("../domains/user");
const productsRoutes = require("../domains/products");
const categoriesRoutes = require("../domains/categories");
const cartRoutes = require("../domains/cart");

router.use(userRoutes);
router.use(productsRoutes);
router.use(categoriesRoutes);
router.use(cartRoutes);

module.exports = router;
export {};
