import checkNotAuth from "../../middleware/checkNotAuth";

const express = require("express");
const passport = require("passport");

const {
  getAllUsers,
  signUp,
  login,
  deleteUser,
  getUserById,
} = require("./controller");

const router = express.Router();

// router.route("/login").post(
//   checkNotAuth,
//   passport.authenticate("local", {
//     // successRedirect: "/",
//     failureRedirect: "/login",
//   })
// );

router.route("/login").post(login);
router.route("/signup").post(signUp);
router.route("/user/:id").delete(deleteUser);
router.route("/user").get(getAllUsers);

module.exports = router;

export {};
