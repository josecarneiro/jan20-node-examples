const dotenv = require('dotenv');

dotenv.config();

const Recipe = require('./models/recipe');
const express = require('express');
const nodeSassMiddleware = require('node-sass-middleware');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');

const isDevelopment = process.env.NODE_ENV === 'development';

app.use(
  nodeSassMiddleware({
    src: path.join(__dirname, '/public'),
    dest: path.join(__dirname, '/public'),
    force: isDevelopment
  })
);

app.use(express.static('public'));

app.use(express.urlencoded());

app.get('/', (req, res) => {
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

app.get('/recipe/create', (req, res) => {
  res.render('create');
});

app.post('/recipe/create', (req, res, next) => {
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

app.post('/recipe/:id/delete', (req, res, next) => {
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

app.get('/recipe/:id/edit', (req, res, next) => {
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

app.post('/recipe/:id/edit', (req, res, next) => {
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

app.get('/recipe/:id', (req, res, next) => {
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

app.use((error, req, res, next) => {
  console.log('Error was caught in catch all handler');
  console.log(error);

  let status;
  switch (error.message) {
    case 'NOT_FOUND':
      status = 404;
      break;
    default:
      status = 500;
  }

  res.status(status).render('error', { error });
});

const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
    app.listen(process.env.PORT);
  })
  .catch(error => {
    console.log(error);
  });
