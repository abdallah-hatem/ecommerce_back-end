import checkAuth from "../../middleware/checkAuth";
import checkNotAuth from "../../middleware/checkNotAuth";
import checkAdmin from "../../middleware/checkAdmin";

const express = require("express");

const {
  getAllSizesToColors,
  addSizeToColors,
  updateSizeToColors,
  deleteSizetoColors,
} = require("./controller");

const router = express.Router();

router
  .route("/size/colors")
  .get(checkAuth, getAllSizesToColors)
  .post(checkAuth, checkAdmin, addSizeToColors);

router
  .route("/size/colors/:id")
  .put(checkAuth, checkAdmin, updateSizeToColors)
  .delete(checkAuth, checkAdmin, deleteSizetoColors);

module.exports = router;

export {};
