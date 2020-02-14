const dotenv = require('dotenv');

dotenv.config();

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

const recipeRouter = require('./routers/recipes');

app.use('/recipe', recipeRouter);

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
