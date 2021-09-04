const express = require("express");
const PORT = 3001;
const app = express()

let data = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]


// Middleware to take JSON body
app.use(express.json())


// Get All

app.get('/api/persons', (request, response) => {
  response.json(data);
})

// Info Page

app.get('/info', (request, response) => {
  let now = new Date();
  let info = `<h2> Phonebook has info for ${data.length} people. </h2> <p> ${now} </p> `
  response.send(info);
})


// Get Single

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = data.filter(person => person.id !== +id);

  response.status(204).end();

})

// Delete Single

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  data = data.filter(person => person.id !== +id);
  response.status(204).end()
})

// Add Post Single

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (Object.keys(body).length === 0) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  if ( !(Object.keys(body).includes("name") && Object.keys(body).includes("number")) ) {
    return response.status(400).json({
      error: 'Wrong object format, please use {name: name, number: number}'
    })
  }

  if (body.name === "" || body.number === "") {
    return response.status(400).json({
      error: 'Empty input'
    })
  }

  if (data.find(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'names must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor((Math.random() * 1000))
  }
  data.push(person);

  response.json(data);

  response.status(200).end()
})

// Error Handling
// Name/Number exists/missing


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})