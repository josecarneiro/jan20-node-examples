const express = require('express');

const app = express();

app.get('/', (request, response) => {
  response.send('Hello World');
});

app.get('/about', (request, response) => {
  response.send('A page about me');
});

app.get('/:name', (request, response) => {
  // Send 'My name is NAME'
  const name = request.params.name;
  if (name.length > 5) {
    response.send('My name is ' + name);
  } else {
    response.send(name + ' is a short name');
  }
});

app.get('/:name/length', (request, response) => {
  // Send 'My name is NAME.length characters long'
  const name = request.params.name;
  response.send(`My name is ${name.length} characters long`);
});

app.get('/:name/:age', (request, response) => {
  const name = request.params.name;
  const age = request.params.age;
  response.send(`My name is ${name} and I\'m ${age} years old`);
});

app.get('/:c/:b/:a', (request, response) => {
  const a = request.params.a;
  const b = request.params.b;
  const c = request.params.c;
  response.send(`The names are ${a}, ${b} and ${c}`);
});

app.listen(3000);
