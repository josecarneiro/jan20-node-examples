const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/node-mongoose-test';

// .then(() => {
//   console.log('Connection has been established');

//   mongoose
//     .disconnect()
//     .then(() => {
//       console.log('Has disconnected');
//     })
//     .catch(error => {
//       console.log(error);
//     });
// })

/*
const bookDocument = {
  title: '1984',
  author: 'George Orwell',
  release: 1949,
  pages: 345,
  genre: ['thriller', 'mistery'],
  available: true
};
*/

const bookSchema = new mongoose.Schema({
  title: String,
  author: {
    type: String,
    required: true
  },
  release: Number,
  pages: {
    type: Number,
    max: 500
  },
  genre: [
    {
      type: String,
      enum: ['memoir', 'thriller', 'drama']
    }
  ],
  available: Boolean
});

const Book = mongoose.model('Book', bookSchema);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connection has been established');

    return Book.create({
      title: 'Walden',
      author: 'Henry',
      release: 1854,
      pages: 362,
      genre: ['memoir'],
      available: true
    });
  })
  .then(bookDocument => {
    console.log(bookDocument);

    return Book.find({ title: '1984' });
  })
  .then(bookDocuments => {
    console.log(bookDocuments);

    return Book.findOne({ author: 'Henry Thoreau' });
  })
  .then(foundBookDocument => {
    console.log(foundBookDocument);

    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Has disconnected');
  })
  .catch(error => {
    console.log(error);
  });

// Chaining promises
/*
functionThatReturnsPromise()
  .then(() => {
    return anotherFunctionThatReturnsPromise();
  })
  .then(() => {
    return anotherFunctionThatReturnsPromise();
  })
  .catch(error => {
    console.log();
  })
  .then(() => {
    return anotherFunctionThatReturnsPromise();
  })
  .then(() => {
    return anotherFunctionThatReturnsPromise();
  })
  .catch(error => {
    console.log();
  })
  .finally(() => {
    console.log('I run after everything else.');
  });
*/
