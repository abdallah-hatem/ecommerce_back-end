import checkAuth from "../../middleware/checkAuth";
import checkNotAuth from "../../middleware/checkNotAuth";
import checkAdmin from "../../middleware/checkAdmin";

const express = require("express");

const { getAllQtyColorSizes, addQtySizeColor } = require("./controller");

const router = express.Router();

router
  .route("/qty-size-color")
  .get(checkAuth, checkAdmin, getAllQtyColorSizes)
  .post(checkAuth, checkAdmin, addQtySizeColor);

module.exports = router;

export {};
