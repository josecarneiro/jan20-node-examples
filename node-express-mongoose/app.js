const dotenv = require('dotenv');

dotenv.config();

const Recipe = require('./models/recipe');

const express = require('express');

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

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

app.get('/recipe/:id', (req, res, next) => {
  const id = req.params.id;
  Recipe.findById(id)
    .then(recipe => {
      if (!recipe) {
        next();
      } else {
        const data = { recipe };
        res.render('single', data);
      }
    })
    .catch(error => {
      console.log(error);
      res.send('Error');
    });
});

app.get('*', (req, res) => {
  res.status(404).send('Page not found');
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
