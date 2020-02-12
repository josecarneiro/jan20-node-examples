const express = require('express');
const hbs = require('hbs');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// Where telling handlebars where to look for partials
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.render('index', {
    title: 'Olá Mundo!',
    message: 'From Ironhack Lisboa'
  });
});

app.get('/about', (request, response) => {
  const data = {
    name: 'José',
    location: 'Lisbon, Portugal',
    profession: 'Lead Teacher',
    pet: {
      name: 'Panda',
      color: 'Black and White',
      species: 'dog'
    },
    pets: [
      {
        name: 'Panda',
        color: 'Black and White',
        species: 'dog',
        wellBehaved: false
      },
      {
        name: 'Pipoca',
        color: 'Brown',
        species: 'dog',
        wellBehaved: true
      },
      {
        name: 'Whiskers',
        color: 'Yellow',
        species: 'cat',
        wellBehaved: false
      }
    ]
  };
  response.render('about', data);
});

app.listen(3000);
