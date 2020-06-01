var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')




var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var dashboardRouter = require('./routes/dashboard');
var addnewclassRouter = require('./routes/addnewclass');
var addnewstudentRouter = require('./routes/addnewstudent');
var viewallclassesRouter = require('./routes/viewallclasses');
var viewallstudentsRouter = require('./routes/viewallstudents');
var aboutRouter = require('./routes/about');
var mainRouter = require('./routes/main');
var blogsingleRouter = require('./routes/blog-single');
var blogRouter = require('./routes/blog');
var coursegrid2Router = require('./routes/course-grid-2');
var coursegrid3Router = require('./routes/course-grid-3');
var coursegrid4Router = require('./routes/course-grid-4');
var pricingRouter = require('./routes/pricing');
var teachersRouter = require('./routes/teachers');
var contactRouter = require('./routes/contact');

var editclassRouter = require('./routes/editclass');
var logoutRouter = require('./routes/logout');
const { mongoURI } = require('./config/key')

var app = express();

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('connected', () => {
  console.log("bhai connected hai");
})
mongoose.connection.on('error', () => {
  console.log("error aa gya");
})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: 'itjjodhpur',
  resave: false,
  saveUninitialized: true
}))

app.use('/', indexRouter);
app.use('/', registerRouter);
app.use('/', dashboardRouter);
app.use('/', addnewstudentRouter);
app.use('/', addnewclassRouter);
app.use('/', viewallclassesRouter);
app.use('/', viewallstudentsRouter);
app.use('/', editclassRouter);
app.use('/', logoutRouter);
app.use('/', mainRouter);
app.use('/', aboutRouter);
app.use('/', blogsingleRouter);
app.use('/', blogRouter);
app.use('/', coursegrid2Router);
app.use('/', coursegrid3Router);
app.use('/', coursegrid4Router);
app.use('/', pricingRouter);
app.use('/', teachersRouter);
app.use('/', contactRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
