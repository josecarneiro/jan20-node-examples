'use strict';

const mongoose = require('mongoose');

// const data = {
//   name: profile.displayName,
//   githubId: profile.id,
//   githubUsername: profile.username,
//   email: profile.emails.find(object => object.primary).value,
//   photo: profile.photos.length ? profile.photos[0].value : undefined,
//   // ...profile.photos.length ? { photo: profile.photos[0].value } : {},
//   // ...(profile.photos.length && { photo: profile.photos[0].value }),
//   location: profile._json.location
// };

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  githubId: {
    type: String
  },
  githubUsername: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  photo: {
    type: String
  },
  location: {
    type: String
  }
});

module.exports = mongoose.model('User', schema);
