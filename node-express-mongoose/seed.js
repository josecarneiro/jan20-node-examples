const dotenv = require('dotenv');

dotenv.config();

const data = require('./data');

const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

const Recipe = require('./models/recipe');

mongoose
  .connect(MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connecting to MongoDB');
    return Recipe.insertMany(data);
  })
  .then(() => {
    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Disconnecte to MongoDB');
  })
  .catch(error => {
    console.log(error);
  });
