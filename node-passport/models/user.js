'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  // name: {
  //   type: String,
  //   required: true
  // },
  passwordHashAndSalt: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', schema);
