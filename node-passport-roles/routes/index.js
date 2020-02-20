'use strict';

const { Router } = require('express');
const router = new Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hello World!' });
});

const routeGuard = allowedRoles => {
  return (req, res, next) => {
    if (req.user && (!allowedRoles.length || allowedRoles.includes(req.user.role))) {
      next();
    } else {
      next(new Error('NOT_AUTHORIZED'));
    }
  };
};

router.get('/private', routeGuard(['teacher', 'teacher_assistant', 'student']), (req, res, next) => {
  res.render('private/basic');
});

router.get('/private/teacher', routeGuard(['teacher']), (req, res, next) => {
  res.render('private/teacher');
});

router.get('/private/teacher-assistant', routeGuard(['teacher', 'teacher_assistant']), (req, res, next) => {
  res.render('private/teacher-assistant');
});

module.exports = router;
