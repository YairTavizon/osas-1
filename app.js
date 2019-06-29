// SET DEBUG=osas:* & npm run devstart
require('dotenv').config();

const createError     = require('http-errors');
const express         = require('express');
const bodyParser   = require('body-parser');
const mongoose     = require('mongoose');
const path            = require('path');
const session      = require('express-session');
const MongoDBStore  = require('connect-mongodb-session')(session);
const csrf          = require('csurf');
const compression   = require('compression');
const expressValidator = require('express-validator');
const flash         = require('express-flash');
const bcrypt        = require('bcrypt-nodejs');
const passport      = require('passport');
const cookieParser    = require('cookie-parser');
const GoogleStrategy = require('passport-google-oauth20');
const logger          = require('morgan');

const Usuario       = require('./models/Usuario');
const secretKey = 'a4f8071f-c873-4447-8ee2';

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
var sessionStore = new MongoDBStore({ uri: process.env.DB, collection: 'sessions' });
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(compression());
app.use(expressValidator());

app.use(csrf({ cookie: true }));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  genid: function(req) {
    return uuid() // use UUIDs for session IDs
  },
  key: 'My[Protectional*xPW2j}4Pass0/',
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
  store: sessionStore
}))

app.use(flash());

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    //check user table for anyone with a facebook ID of profile.id
    Usuario.findOne({provider: profile.provider, token: profile.id }, 
    (err, user) => {
        if (err)
            return done(null, false);        
        //No user was found... so create a new user with values from Facebook (all the profile. stuff)
        if (!user) {
            user = new Usuario({
              nombre: profile.name.givenName,
              apellidos: profile.name.familyName,
              email: profile.emails[0].value,
              avatar: profile.photos[0].value.split('?')[0],
              token: profile.id,
              provider: profile.provider
            });
            user.save((err) => {
                if (err) 
                  done(null, false);
                return done(null, user);
            });
        } else            
            return done(null, user); //found user. Return
    });

  }
));

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
  done(null, user._id);
});


passport.deserializeUser(function(id, done) {
  Usuario.findById(id, function(err, user) {
   done(err, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*Call to router Controller*/
require('./bin/routes.js')(app, passport);

module.exports = app;
