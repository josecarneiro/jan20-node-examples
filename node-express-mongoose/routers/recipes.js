const express = require('express');
const Recipe = require('./../models/recipe');

const router = new express.Router();

router.get('/list', (req, res) => {
  Recipe.find()
    .then(recipes => {
      const data = { recipes };
      res.render('list', data);
    })
    .catch(error => {
      console.log(error);
      res.send('Error');
    });
});

router.get('/create', (req, res) => {
  res.render('create');
});

router.post('/create', (req, res, next) => {
  const data = {
    title: req.body.title,
    cuisine: req.body.cuisine
  };

  Recipe.create(data)
    .then(recipe => {
      const id = recipe._id;
      res.redirect(`/recipe/${id}`);
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;

  Recipe.findByIdAndDelete(id)
    .then(recipe => {
      console.log('Delete recipe', id);
      res.redirect(`/`);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  Recipe.findById(id)
    .then(recipe => {
      if (!recipe) {
        next(new Error('NOT_FOUND'));
      } else {
        const data = { recipe };
        res.render('edit', data);
      }
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  const data = {
    title: req.body.title,
    cuisine: req.body.cuisine
  };
  Recipe.findByIdAndUpdate(id, data, { runValidators: true })
    .then(() => {
      res.redirect(`/recipe/${id}`);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Recipe.findById(id)
    .then(recipe => {
      if (!recipe) {
        next(new Error('NOT_FOUND'));
      } else {
        const data = { recipe };
        res.render('single', data);
      }
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
