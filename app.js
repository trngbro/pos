var createError = require("http-errors");
var express = require("express");
var exphbs = require("express-handlebars")
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
var bodyparser = require("body-parser");

var loginRouter = require("./api/v1/routes/login");
var logoutRouter = require("./api/v1/routes/logout");
var homeRouter = require("./api/v1/routes/home");
var productRouter = require("./api/v1/routes/product");
var categoryRouter = require("./api/v1/routes/categories");
var warehouseRouter = require("./api/v1/routes/warehouse");
var indexRouter = require("./api/v1/routes/index");

dotenv.config();

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error(`${err} \n\n\n\n\n\n ${process.env.DATABASE}`);
  });

var app = express();

// view engine setup
app.engine('hbs', exphbs.engine({
  defaultLayout: "layout",
  helpers: {
  },
  partialsDir: __dirname + '/views/partials'
}))
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(logger("common")); //dev
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  bodyparser.json({
    limit: "50mb",
  })
);
app.use(helmet());
app.use(cors());
// app.use(logger("common"));

app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/home", homeRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/warehouse", warehouseRouter);
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("500", {layout: false});
});

module.exports = app;