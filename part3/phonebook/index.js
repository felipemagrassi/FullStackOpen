const morgan = require('morgan');
const express = require('express');
const cors = require('cors');

const app = express();
require('dotenv').config();
const Person = require('./models/person');

// Static Build
app.use(express.static('build'));

// CORS for requests
app.use(cors());

// Middleware to take JSON body
app.use(express.json());

// morgan
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// Get All
app.get('/api/persons', (request, response) => {
  Person.find({}).then((person) => {
    response.json(person);
  });
});

// Info Page

app.get('/info', (request, response) => {
  const now = new Date();
  Person.countDocuments({}).then((count) => response.send(`<h2> Phonebook has info for ${count} people. </h2> <p> ${now} </p> `));
});

// Get Single

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
        response.status(200).end();
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// Delete Single

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// Update Phone

app.put('/api/persons/:id', (request, response, next) => {
  const { body } = request;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { runValidators: true, new: true })
    .then((personObj) => { personObj.toJSON(); })
    .then((formattedPerson) => { response.json(formattedPerson); })
    .catch((error) => next(error));
});

// Add Post Single

app.post('/api/persons', (request, response, next) => {
  const { body } = request;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((personObj) => { personObj.toJSON(); })
    .then((formattedPerson) => { response.json(formattedPerson); })
    .catch((error) => next(error));
});

// Error handling middleware

app.use((error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
