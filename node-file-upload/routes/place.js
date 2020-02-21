const express = require('express');
const router = new express.Router();

const Place = require('./../models/place');

router.get('/list', (req, res, next) => {
  // ...
  res.render('place/list');
});

router.get('/create', (req, res, next) => {
  // ...
  res.render('place/create');
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Place.findById(id)
    .then(place => {
      res.render('place/single', { place });
    })
    .catch(error => {
      next(error);
    });
});

const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  resource_type: 'raw'
});

const storage = multerStorageCloudinary({
  cloudinary,
  folder: 'jan20',
  resource_type: 'raw'
  // allowedFormats: ['jpg', 'png', 'mov', 'mp4']
});

const uploader = multer({ storage });

router.post('/create', uploader.single('picture'), (req, res, next) => {
  console.log(req.file);
  console.log(req.body);

  const { name, description } = req.body;
  const { url } = req.file;
  Place.create({
    name,
    description,
    picture: url
  })
    .then(place => {
      res.redirect(`/place/${place._id}`);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
