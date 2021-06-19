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

// GET List of users
app.get('/users', (req, res) => {
  res.json(users);
});

//CREATE new user
app.post('/users', (req, res) => {
 //res.send('new user is created');
  let newUser = req.body;

  if (!newUser) {
    const message = 'Missing name of user in request body';
    res.status(400).send(message);
  } else {
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

//UPDATE info about a user such as username
app.put('/users/:Username', (req, res) => {
  res.send('updated infos about user');
});

//ADD movie to favorite list
app.post('/users/:Username/movies/:movieID', (req, res) => {
  res.send('added movie to the list!');
});

//DELETE movie from favourite List
app.delete('/users/:Username/movies/:movieID', (req, res) => {
  res.send('deleted movie from the list!');
});

//DELETE user account
app.delete('/users/:id', (req, res) => {
  res.send('deleted user');
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
