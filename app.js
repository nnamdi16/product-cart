/**
 * Required External Modules
 */
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const expressSession = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const db = require("./api/config/database");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
require("dotenv").config();

/**
 * App Variable
 */
const app = express();

//Product routes
const productRoutes = require("./api/products/products.routes");

//Cart Routes

const cartRoutes = require("./api/cart/cart.routes");


//configure body-parser
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({
  extended: true
});

/**
 * Session Configuration
 */

 const session = {
   secret: process.env.SESSION_SECRET,
   cookie: {},
   resave: false,
   saveUninitialized:false
 };

 const strategy = new Auth0Strategy(
   {
     domain: process.env.AUTH0_DOMAIN,
     clientID: process.env.AUTH0_CLIENT_ID,
     clientSecret: process.env.AUTH0_CLIENT_SECRET,
     callbackURL:process.env.AUTH0_CALLBACK_URL
   }, 
   (accessToken, refreshToken, extraParams, profile, done) => {
      /**
       * Access tokens are used to authorixe users to an API(resource server)
       * accessToken is the token to call the the Auth0 API
       * or a secured third-party API
       * extraParams.id_token has the JSON Web Token
       * profile has all the information from the user
       */
      console.log(accessToken,refreshToken,extraParams,profile);
       return done(null, profile);
   }
 );

 if (app.get("env") === "production") {
  //  Serve secure cookies, require HTTPS
  session.cookie.secure = true
 }

//Initialize express Router
const router = express.Router();

db();

// view engine setup

app.set('view engine', 'pug')
app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

app.use(logger("dev"));
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(expressSession(session));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user,done)=> {
  done(null, user);
});


passport.serializeUser((user,done) => {
  done(null, user)
});

app.use((req,res,next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
})

console.log(path.join(__dirname, "views"));
// router.use("/", indexRouter);
router.use("/api", indexRouter);
router.use("/user", usersRouter);
router.use("/product", productRoutes);
router.use("/cart",cartRoutes);


app.use("/", router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Error handling
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization"
  );
  next();
});

module.exports = app;
