'use strict';

const passport = require('passport');
const passportLocal = require('passport-local');

const PassportLocalStrategy = passportLocal.Strategy;

const bcryptjs = require('bcryptjs');

const User = require('./models/user');

// Strategy for sign in
// Strategy for sign up
// Tell passport how to serialize user
// Tell passport how to deserialize user

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then(user => {
      callback(null, user);
    })
    .catch(error => {
      callback(error);
    });
});

const signInStrategy = new PassportLocalStrategy({}, (username, password, callback) => {
  let user;
  User.findOne({
    username
  })
    .then(document => {
      user = document;
      if (document) {
        return bcryptjs.compare(password, user.passwordHashAndSalt);
      } else {
        return Promise.reject(new Error('USER_DOES_NOT_EXIST'));
      }
    })
    .then(passwordMatches => {
      if (passwordMatches) {
        callback(null, user);
      } else {
        return Promise.reject(new Error('PASSWORD_DOES_NOT_MATCH'));
      }
    })
    .catch(error => {
      callback(error);
    });
});

passport.use('sign-in', signInStrategy);

const signUpStrategy = new PassportLocalStrategy({}, (username, password, callback) => {
  User.findOne({ username })
    .then(user => {
      if (user) {
        const error = new Error('USER_ALREADY_EXISTS');
        return Promise.reject(error);
      } else {
        return bcryptjs.hash(password, 10);
      }
    })
    .then(hashAndSalt => {
      return User.create({
        username,
        passwordHashAndSalt: hashAndSalt
      });
    })
    .then(user => {
      // User was successfully created
      callback(null, user);
    })
    .catch(error => {
      // do something with error
      callback(error);
    });
});

passport.use('sign-up', signUpStrategy);
