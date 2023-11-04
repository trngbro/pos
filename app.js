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
var bodyParser = require("body-parser");


var loginRouter = require("./api/v1/routes/login");
var logoutRouter = require("./api/v1/routes/logout");
var homeRouter = require("./api/v1/routes/home");
var productRouter = require("./api/v1/routes/product");
var categoryRouter = require("./api/v1/routes/categories");
var warehouseRouter = require("./api/v1/routes/warehouse");
var customerRouter = require("./api/v1/routes/customer");
var posRouter = require("./api/v1/routes/pos");
var staffRouter = require("./api/v1/routes/staff");
var revenuesRouter = require("./api/v1/routes/revenues");
var indexRouter = require("./api/v1/routes/index");
var userRouter = require("./api/v1/routes/user");
var blockRouter = require("./api/v1/routes/blocking");

var fn_helper = require("./api/v1/helpers/functionalHelper");

var isLogin = require("./api/v1/middlewares/authAccount");
var isAdmin = require("./api/v1/middlewares/checkPermission");

process.env.NODE_NO_WARNINGS = 1;

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
    currentFormat: fn_helper.formatCurrency,
    getStaffName: fn_helper.getStaffNameFromSalerData,
    comparingString: fn_helper.equalStringWithString
  },
  partialsDir: __dirname + '/views/partials'
}))
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(logger("dev", {
  skip: function (req, res) {
    return req.url.includes("/vendors") ||
      req.url.includes("/images") ||
      req.url.includes("/javascripts") ||
      req.url.includes("/stylesheets") ||
      req.url.includes("/favicon.ico");
  }
})); //dev
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  bodyParser.json({
    limit: "50mb"
  }),
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true
  })
);
app.use(helmet());
app.use(cors());
// app.use(logger("common"));

app.use("/blocking", blockRouter);
app.use("", indexRouter)
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("", isLogin)
app.use("/user", userRouter);
app.use("/pos", posRouter);
app.use("", isAdmin)
app.use("/home", homeRouter);
app.use("/revenues", revenuesRouter)
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/warehouse", warehouseRouter);
app.use("/customers", customerRouter);
app.use("/accounts", staffRouter);


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
  res.render("404", {
    layout: false
  });
});

module.exports = app;