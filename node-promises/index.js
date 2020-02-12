const fs = require('fs');

/*
fs.readFile('./a.txt', { encoding: 'utf-8' }, (error, data) => {
  if (error) {
    console.log('Error reading file');
    console.log(error);
  } else {
    console.log('File read successfully');
    console.log(data);
  }
});
*/

/*
const data = fs.readFileSync('./a.txt', { encoding: 'utf-8' });
console.log('File read successfully');
console.log(data);
*/

// The following returns a promise
const fileReadingPromise = fs.promises.readFile('./a.txt', { encoding: 'utf-8' });

fileReadingPromise
  .then(data => {
    // When the action succeeds, the function passed to .then is going to run
    // ...
    console.log('Success');
    console.log(data);
  })
  .catch(error => {
    // If it fails, the function passed to .catch runs
    // ...
    console.log('failure');
    console.log(error);
  });
