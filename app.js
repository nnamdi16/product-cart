/**
 * Required External Modules
 */
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const db = require("./api/config/database");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

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
console.log(path.join(__dirname, "views"));
// router.use("/", indexRouter);
router.use("/users", usersRouter);
router.use("/api", indexRouter);
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
