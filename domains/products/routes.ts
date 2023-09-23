/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Products APIs
 * /product:
 *   get:
 *     summary: List all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Products'
 *   post:
 *     summary: Create a new Product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Products'
 *     responses:
 *       200:
 *         description: product created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Products'
 *       500:
 *         description: Some server error
 * /product/{id}:
 *   get:
 *     summary: get product by id
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: get product by id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Products'
 *   delete:
 *     summary: Remove the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *
 *     responses:
 *       200:
 *         description: The product was deleted
 *       404:
 *         description: The product was not found
 *
 *   put:
 *     summary: Update the product by id
 *     tags: [Products]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Products'
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Update product
 *
 *     responses:
 *       200:
 *         description: The product was updated successfully
 *       400:
 *         description: The product was not updated
 *
 * /cat-products/{id}:
 *   get:
 *     summary: get product by category id
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: get product by category id
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Products'
 */

import checkAuth from "../../middleware/checkAuth";
import checkNotAuth from "../../middleware/checkNotAuth";
import checkAdmin from "../../middleware/checkAdmin";

const express = require("express");

const {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductById,
  getProductsByCatId,
  getPaginatedProducts,
} = require("./controller");

const router = express.Router();

router
  .route("/products")
  .get(checkAuth, getAllProducts)
  .post(checkAuth, checkAdmin, createProduct);

router
  .route("/product/:id")
  .get(checkAuth, getProductById)
  .delete(checkAuth, checkAdmin, deleteProduct)
  .put(checkAuth, checkAdmin, updateProduct);

router.route("/products/category/:id").get(checkAuth, getProductsByCatId);

router.route("/products/page/:id").get(checkAuth, getPaginatedProducts);

module.exports = router;

export {};
