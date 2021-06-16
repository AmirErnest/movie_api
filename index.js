const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('common'));
app.use(express.static('public'));
app.use(bodyParser.json());

let movies = [
  {
    movieID: 1,
    title: 'iron_man',
    genre: 'action',
  },
  {
    movieID: 2,
    title: 'movie2',
  },
  {
    imovieID: 3,
    title: 'movie3',
  }
];

let users = [
  {
    id: 1,
    Username: 'Jessica_Drake',
  },
  {
    id: 2,
    Username: 'Ben_Cohen',
  },
  {
    id: 3,
    Username: 'Lisa_Downing',
  }
];

// GET List of Movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

// GET info about a single Movie
app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movie) =>
  {return movie.title === req.params.title}));
});

//GET data about a genre by name/title
app.get('/movies/genre/:name', (req, res) => {
  res.send('successful GET request returning data on this Genre');
});

//GET info about director
app.get('/movies/directors/:name', (req, res) => {
  res.send('successful GET request returning data about director');
});

//CREATE new user
app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
    const message = 'Missing name of user in request body';
    res.status(400).send(message);
  } else {
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

//UPDATE info about a user such as username
app.put('/users/:Username', (req, res) => {
  let user = users.find((user) => {return user.Username === req.params.Username});

  if (user) {
    res.status(201).send('user ' + req.params.Username + 'is assigned new username of' + Username);
  } else {
    res.status(404).send('user with the name ' + req.params.Username + ' was not found.');
  }
});

//ADD movie to favorite list
app.post('users/:Username/movies/:movieID', (req, res) => {
  res.send('added movie to the list!');
});

//DELETE movie from favourite List
app.delete('users/:Username/movies/:movieID', (req, res) => {
  res.send('deleted movie from the list!');
});

//DELETE user account
app.delete('/users/:id', (req, res) => {
  let user = users.find((user) => { return user.id === req.params.id });

  if (user) {
    users = users.filter((obj) => { return obj.id !== req.params.id });
    res.status(201).send('user ' + req.params.id + ' was deleted.');
  }
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
