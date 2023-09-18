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
 * /book/{id}:
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
 */
import checkAuth from "../../middleware/checkAuth";
import checkNotAuth from "../../middleware/checkNotAuth";

const express = require("express");

const {
  getAllUsers,
  signUp,
  login,
  deleteUser,
  getUserById,
  getCookie,
} = require("./controller");

const router = express.Router();

router.route("/login").post(checkNotAuth, login);
router.route("/signup").post(checkNotAuth, signUp);
router.route("/user/:id").delete(deleteUser);
router.route("/user").get(getAllUsers).get(getCookie);
router.route("/cookie").get(getCookie);

module.exports = router;

export {};
