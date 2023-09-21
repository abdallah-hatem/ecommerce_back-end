/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id
 *         name:
 *           type: string
 *           description: users name
 *         email:
 *           type: string
 *           description: email od user
 *         password:
 *           type: string
 *           description: password of email
 *         cart:
 *           type: array of objects
 *           description: cart
 *
 */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users APIs
 * /user:
 *   get:
 *     summary: List all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users'
 *   post:
 *     summary: Create a new User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Some server error
 * /user/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 *
 *   put:
 *     summary: Update the user by id
 *     tags: [Users]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Update user
 *
 *     responses:
 *       200:
 *         description: The user was updated successfully
 *       400:
 *         description: The user was not updated
 *
 * /signup:
 *   post:
 *     summary: Signup
 *     tags: [Users]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: Siggned up successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users'
 *
 * /login:
 *   post:
 *     summary: Login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users'
 * /logout:
 *   post:
 *     summary: Logout
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Logged out successfully
 *
 */
import checkAuth from "../../middleware/checkAuth";
import checkNotAuth from "../../middleware/checkNotAuth";
import checkAdmin from "../../middleware/checkAdmin";

const express = require("express");

const {
  getAllUsers,
  signUp,
  login,
  deleteUser,
  deleteCookie,
  getUserById,
  updateUser,
  getCookie,
} = require("./controller");

const router = express.Router();

router.route("/login").post(checkNotAuth, login);
router.route("/signup").post(checkNotAuth, signUp);
router.route("/logout").post(checkAuth, deleteCookie);

router
  .route("/user/:id")
  .get(checkAuth, checkAdmin, getUserById)
  .put(checkAuth, checkAdmin, updateUser)
  .delete(checkAuth, checkAdmin, deleteUser);

router.route("/user").get(checkAuth, checkAdmin, getAllUsers);

module.exports = router;

export {};
