const express = require('express');

const app = express();

app.get('/', (request, response) => {
  response.send('Hello World');
});

app.get('/:name', (request, response) => {
  // Send 'My name is NAME'
  const name = request.params.name;
  response.send('My name is ' + name);
});

app.get('/:name/length', (request, response) => {
  // Send 'My name is NAME.length characters long'
  const name = request.params.name;
  response.send(`My name is ${name.length} characters long`);
});

app.listen(3000);
