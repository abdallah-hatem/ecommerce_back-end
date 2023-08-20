const express = require("express");
const { getAllUsers } = require("./controller");

const router = express.Router();

// router.route("/login").post(login);
// router.route("/signup").post(signUp);
// router.route("/user/:id").delete(deleteUser);
router.route("/user").get(getAllUsers);

module.exports = router;
