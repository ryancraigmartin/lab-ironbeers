const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials'); // Look inside the views folder for partials


app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers() // Call this function
  .then(beers => { // Then when you're done, render beers.
    console.log(beers);
    res.render('beers', { beers });
  })
  .catch(error => { // If beers can't be rendered, throw an error.
    console.log(error) 
  })
});

app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
  .then(randomBeer => {
    console.log("================")
    console.log(randomBeer)
    res.render('random-beers', { randomBeer: randomBeer[0] });
  })
  .catch(error => {
    console.log(error)
  })
});

app.listen(3000);