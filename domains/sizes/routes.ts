import checkAuth from "../../middleware/checkAuth";
import checkNotAuth from "../../middleware/checkNotAuth";
import checkAdmin from "../../middleware/checkAdmin";

const express = require("express");

const {
  getAllSizes,
  addSize,
  deleteSize,
  updateSize,
} = require("./controller");

const router = express.Router();

router.route("/sizes").get(checkAuth, checkAdmin, getAllSizes).post(addSize);
router.route("/sizes/:id").delete(deleteSize).put(updateSize);

module.exports = router;

export {};
