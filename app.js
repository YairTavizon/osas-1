// SET DEBUG=osas:* & npm run devstart
require('dotenv').config();

const createError     = require('http-errors');
const express         = require('express');
const bodyParser   = require('body-parser');
const mongoose     = require('mongoose');
const path            = require('path');
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);
const cookieParser    = require('cookie-parser');
const logger          = require('morgan');

/**
 * Express UUID creator
 */
const uuid = require('uuid/v4');
mongoose
  .connect(process.env.DB, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  genid: function(req) {
    return uuid() // use UUIDs for session IDs
  },
  key: 'My[Protectional*xPW2j}4Pass0/',
  secret: 'a4f8071f-c873-4447-8ee2',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

/*Call to router Controller*/
require('./bin/routes.js')(app);

app.use(function (req, res) {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  res.render('404', { status: 404, title: 'Error 404' });
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
