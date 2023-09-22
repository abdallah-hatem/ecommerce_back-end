import checkAuth from "../../middleware/checkAuth";
import checkNotAuth from "../../middleware/checkNotAuth";
import checkAdmin from "../../middleware/checkAdmin";

const express = require("express");

const {
  getAllColors,
  addColor,
  deleteColor,
  updateColor,
} = require("./controller");

const router = express.Router();

router.route("/colors").get(checkAuth, checkAdmin, getAllColors).post(addColor);
router.route("/colors/:id").delete(deleteColor).put(updateColor);

module.exports = router;

export {};
