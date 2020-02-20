'use strict';

const { Router } = require('express');
const router = new Router();

const passport = require('passport');

router.get('/github', passport.authenticate('github'));

router.get(
  '/github-callback',
  passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/authentication/sign-in'
  })
);

router.post('/sign-out', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
