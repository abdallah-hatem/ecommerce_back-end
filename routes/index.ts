const express = require("express");
const router = express.Router();

const userRoutes = require("../domains/user");
const productsRoutes = require("../domains/products");
const categoriesRoutes = require("../domains/categories");
const cartRoutes = require("../domains/cart");
const colorsRoutes = require("../domains/colors");
const sizesRoutes = require("../domains/sizes");
const sizeToColorsRoutes = require("../domains/sizeToColors");
const qtyColorSizeRoutes = require("../domains/qtyColorSize");

router.use(userRoutes);
router.use(productsRoutes);
router.use(categoriesRoutes);
router.use(cartRoutes);
router.use(colorsRoutes);
router.use(sizesRoutes);
router.use(sizeToColorsRoutes);
router.use(qtyColorSizeRoutes);

module.exports = router;
export {};
