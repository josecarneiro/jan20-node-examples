const express = require('express');
const hbs = require('hbs');

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.render('index');
});

//

const axios = require('axios');

app.get('/search', (request, response) => {
  const term = request.query.term;

  const requestPromise = axios.get(`http://www.omdbapi.com/?apikey=c90b8787&s=${term}`);

  requestPromise
    .then(output => {
      const data = {
        results: output.data.Search
      };

      response.render('results', data);
    })
    .catch(error => {
      // ...
    });
});

app.get('/movie/:id', (request, response) => {
  const id = request.params.id;

  const requestPromise = axios.get(`http://www.omdbapi.com/?apikey=c90b8787&i=${id}`);

  requestPromise
    .then(output => {
      const data = {
        movie: output.data
      };

      response.render('single', data);
    })
    .catch(error => {
      // ...
    });
});

app.listen(3000);
