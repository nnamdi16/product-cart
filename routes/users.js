var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('user', {title:"Profile", userProfile:{nickname:"Auth0"}});
});

module.exports = router;
