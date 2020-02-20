'use strict';

const passport = require('passport');
const passportGithub = require('passport-github');

const PassportGithubStrategy = passportGithub.Strategy;

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

const githubStrategy = new PassportGithubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/authentication/github-callback',
    scope: 'user:email'
  },
  (accessToken, refreshToken, profile, callback) => {
    const data = {
      name: profile.displayName,
      githubId: profile.id,
      githubUsername: profile.username,
      email: profile.emails.find(object => object.primary).value,
      photo: profile.photos.length ? profile.photos[0].value : undefined,
      // ...profile.photos.length ? { photo: profile.photos[0].value } : {},
      // ...(profile.photos.length && { photo: profile.photos[0].value }),
      location: profile._json.location
    };

    User.findOne({
      githubId: data.githubId
    })
      .then(user => {
        if (user) {
          return Promise.resolve(user);
        } else {
          return User.create(data);
        }
      })
      .then(user => {
        callback(null, user);
      })
      .catch(error => {
        callback(error);
      });
  }
);

passport.use('github', githubStrategy);
