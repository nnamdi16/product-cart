const {
  addToCart,
  getCart,
  // getHero,
  updateCart,
  // removeHero
} = require("./cart.controller");
const express = require("express");
const router = express.Router();

router.route("/create").post(addToCart);
// router.route("/get").get(getCart);
// router.route("/get/:name").get(getHero);
router.put("/update/:id", updateCart);
// router.delete("/remove/:id", removeHero);

module.exports = router;
