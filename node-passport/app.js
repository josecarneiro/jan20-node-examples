'use strict';

// 0 - Include all of the middleware that we have included for basic authentication
// 1 - We need to mount passport as a middleware on app.js.
// 2 - We'll create a passport configuration file in which we'll set strategies for login, sign up, and we'll tell passport how to deserialize the user object.
// 3 - Instead of doing the custom auth logic in our controllers, we'll just pass the appropriate strategy to each route handler.

const { join } = require('path');
const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const serveFavicon = require('serve-favicon');
const passUserToTemplate = require('./middleware/pass-user-to-template');

const mongoose = require('mongoose');
const expressSession = require('express-session');
const ConnectMongo = require('connect-mongo');

const mongoStore = ConnectMongo(expressSession);

const passport = require('passport');

const indexRouter = require('./routes/index');
const authenticationRouter = require('./routes/authentication');

const app = express();

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(serveFavicon(join(__dirname, 'public/images', 'favicon.ico')));
app.use(
  sassMiddleware({
    src: join(__dirname, 'public'),
    dest: join(__dirname, 'public'),
    outputStyle: process.env.NODE_ENV === 'development' ? 'nested' : 'compressed',
    force: process.env.NODE_ENV === 'development',
    sourceMap: true
  })
);
app.use(express.static(join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000
    },
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60
    })
  })
);

// Initiate passport middleware before mounting routers and after mounting express-session

require('./passport-config');

app.use(passport.initialize());
app.use(passport.session());

app.use(passUserToTemplate);

app.use('/', indexRouter);
app.use('/authentication', authenticationRouter);

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  // Set error information, with stack only available in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};
  res.status(error.status || 500);
  res.render('error');
});

module.exports = app;
