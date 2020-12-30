const {
  createHero,
  getHeros,
  getHero,
  updateHero,
  removeHero
} = require("./heros.controller");
const express = require("express");
const router = express.Router();

router.route("/create").post(createHero);
router.route("/get").get(getHeros);
router.route("/get/:name").get(getHero);
router.put("/update/:id", updateHero);
router.delete("/remove/:id", removeHero);

module.exports = router;
