'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
const Restaurant = require('./models/restaurant');

const URI = process.env.MONGODB_URI;

mongoose
  .connect(URI)
  .then(() => {
    const randomBetween = (min, max) => Math.random() * (max - min) + min;

    const restaurants = [...new Array(200)].fill(null).map(() => ({
      name: 'admsdfmnsf',
      location: {
        coordinates: [randomBetween(-10, -8), randomBetween(37, 39)]
      }
    }));

    return Restaurant.create(restaurants);
  })
  .then(restaurants => {
    console.log(restaurants);
  })
  .catch(error => {
    console.log(error);
    console.error(`There was an error connecting the database to URI "${URI}"`);
    process.exit(1);
  });
