'use strict';

const { Router } = require('express');
const router = new Router();
const Restaurant = require('./../models/restaurant');

router.get('/list', (req, res, next) => {
  const { latitude, longitude, distance } = req.query;

  Restaurant.find({
    location: {
      $nearSphere: {
        $geometry: {
          type: 'Point',
          coordinates: [Number(longitude), Number(latitude)]
        },
        $maxDistance: 1000 * Number(distance)
      }
    }
  })
    .then(restaurants => {
      res.render('restaurant/list', { restaurants });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/create', (req, res, next) => {
  res.render('restaurant/create');
});

router.post('/create', (req, res, next) => {
  const { name, specialty, latitude, longitude } = req.body;

  Restaurant.create({
    name,
    specialty,
    location: {
      coordinates: [longitude, latitude]
    }
  })
    .then(restaurant => {
      res.redirect(`/restaurant/${restaurant._id}`);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:restaurantId', (req, res, next) => {
  const { restaurantId } = req.params;

  Restaurant.findById(restaurantId)
    .then(restaurant => {
      res.render('restaurant/single', { restaurant });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
