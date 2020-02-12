const express = require('express');
const hbs = require('hbs');
const Pokedex = require('pokedex');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

hbs.registerPartials(__dirname + '/views/partials');

const pokedex = new Pokedex();

app.get('/', (request, response) => {
  const list = [];
  for (let i = 1; i <= 151; i++) {
    const pokemon = pokedex.pokemon(i);
    list.push(pokemon);
  }
  const data = {
    pokemonList: list
  };
  response.render('index', data);
});

app.get('/pokemon/:name', (request, response) => {
  const name = request.params.name;

  // const pokemon = pokedex.pokemon(name);

  const pokemon = pokedex.pokemon(name);

  const data = {
    singlePokemon: pokemon
  };

  response.render('single', data);
});

app.listen(3000);
