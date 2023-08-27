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

router.route("/login").post(login);
router.route("/signup").post(signUp);
router.route("/user/:id").delete(deleteUser);
router.route("/user").get(getAllUsers);
router.route("/cookie").get(getCookie);

module.exports = router;

export {};
