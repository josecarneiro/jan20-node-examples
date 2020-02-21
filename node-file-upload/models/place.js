'use strict';

const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    picture: {
      type: String
    }
  },
  {
    // timestamps: true
    timestamps: {
      createdAt: 'creationDate',
      updatedAt: 'updateDate'
    }
  }
);

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
