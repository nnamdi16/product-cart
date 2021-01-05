/**
 * Required External Modules
 */
const express = require('express');
const passport = require("passport");
const querystring = require('querystring');
const router = express.Router();

require('dotenv').config();


/** 
 * Routes Definition 
 */
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Home' });
});

router.get("/login", passport.authenticate("auth0", {
  scope: "openid email profile"
}),
(req,res) => {
  res.redirect("/api");
}
)


router.get("/callback", (req,res,next) => {
  passport.authenticate("auth0", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      const returnTo = req.session.returnTo;
      this.delete(req.session.returnTo);
      res.redirect(returnTo || "/");
    });
  })(req,res,next)
})

router.get("/logout", (req,res) => {
  req.logout();

  let returnTo = req.protocol + "://" + req.hostname;

  const port = req.connection.localPort;

  if (port !== undefined && port !== 80 && port !== 443) {
    returnTo = process.env.NODE_ENV === "production" ? `${returnTo}` : `${returnTo}:${port}/api`;
  }

  const logoutURL = new URL(
    `https://${process.env.AUTH0_DOMAIN}/v2/logout`
  );

  const searchString  = querystring.stringify({
    client_id:process.env.AUTH0_CLIENT_ID,
    returnTo
  });
  logoutURL.search = searchString;

  res.redirect(logoutURL);
})
module.exports = router;
