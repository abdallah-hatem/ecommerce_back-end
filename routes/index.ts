const express = require("express");
const router = express.Router();

const userRoutes = require("../domains/user");
const productsRoutes = require("../domains/products");

router.use(userRoutes);
router.use(productsRoutes);

module.exports = router;
export {};
