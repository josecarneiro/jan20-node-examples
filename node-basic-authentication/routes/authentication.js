'use strict';

const { Router } = require('express');
const router = new Router();

const bcryptjs = require('bcryptjs');

const User = require('./../models/user');

router.get('/sign-in', (req, res, next) => {
  res.render('authentication/sign-in');
});

router.post('/sign-in', (req, res, next) => {
  const { email, password } = req.body;

  let user;

  User.findOne({ email })
    .then(document => {
      if (!document) {
        next(new Error('USER_NOT_FOUND'));
      } else {
        user = document;
        return bcryptjs.compare(password, document.passwordHash);
      }
    })
    .then(match => {
      if (match) {
        req.session.userId = user._id;
        res.redirect('/');
      } else {
        next(new Error('USER_PASSWORD_WRONG'));
      }
    })
    .catch(error => {
      next(error);
    });
});

router.get('/sign-up', (req, res, next) => {
  res.render('authentication/sign-up');
});

router.post('/sign-up', (req, res, next) => {
  const { email, password, name } = req.body;

  bcryptjs
    .hash(password, 10)
    .then(hashPlusSalt => {
      return User.create({
        email,
        name,
        passwordHash: hashPlusSalt
      });
    })
    .then(user => {
      req.session.userId = user._id;
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

router.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
