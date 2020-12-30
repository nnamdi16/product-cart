const {
  addToCart,
  getHeros,
  getHero,
  updateHero,
  removeHero
} = require("./cart.controller");
const express = require("express");
const router = express.Router();

router.route("/create").post(addToCart);
// router.route("/get").get(getHeros);
// router.route("/get/:name").get(getHero);
// router.put("/update/:id", updateHero);
// router.delete("/remove/:id", removeHero);

module.exports = router;
