const {
  createProduct,
  getProductByName,
  getProducts,
  // updateHero,
  // removeHero
} = require("./products.controller");
const express = require("express");
const router = express.Router();

router.route("/create").post(createProduct);
router.route("/get").get(getProducts);
router.route("/get/:name").get(getProductByName);
// router.put("/update/:id", updateHero);
// router.delete("/remove/:id", removeHero);

module.exports = router;
