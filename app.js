// env
require("dotenv").config({ path: './env/.env' });

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const apiRouters = require("./routes/index");

var app = express();

// Set up mongoose connection
var mongoose = require("mongoose");
var mongoDBUrl = process.env.DB_HOST+"?retryWrites=true";
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose.connect(mongoDBUrl, {
  auth: { "authSource": "cloudDB" },
  user: process.env.DB_USER,
  pass: process.env.DB_PWD,
  poolSize: 10,
  useNewUrlParser: true, 
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.all("*", (req, res, next) => {
  const { origin, Origin, referer, Referer } = req.headers;
  const allowOrigin = origin || Origin || referer || Referer || "*";
  res.header("Access-Control-Allow-Origin", allowOrigin);
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", "Express");
  if (req.method == "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


// 路由
// app.use('/', indexRouter);
app.use('/api',apiRouters);


// catch 404 and forward to error handler
// 捕获 404 并抛给错误处理器
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// 错误处理器
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // 设置 locals，只在开发环境提供错误信息
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  // 渲染出错页面
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
