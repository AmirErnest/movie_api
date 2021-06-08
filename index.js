const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('common'));
app.use(express.static('public'));

// GET requests
app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.get('/', (req, res) => {
  res.send('Hello to my movies list');
});

app.get('/documentation.html', (req, res) => {
  res.sendFile('public/documentation.html', {root: __dirname});
});

// listen for requests
app.listen(8080, ()=> {
  console.log('I am running!')
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something Broke!');
});
