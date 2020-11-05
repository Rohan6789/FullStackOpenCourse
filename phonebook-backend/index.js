const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

let phonebook = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Landing page</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const contact = phonebook.find(contact => contact.id === id)
    if (contact) {
        response.json(contact)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/delete/:id', (request, response) => {
    const id = Number(request.params.id)
    phonebook = phonebook.filter(contact => contact.id !== id)
  
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.content || !body.number) {
      return response.status(400).json({ 
        error: 'content or number missing' 
      })
    }
  
    const contact = {
        name: body.content,
        number: body.number,
        id: generateId(),
    }
  
    phonebook = phonebook.concat(contact)
  
    response.json(contact)
})

const generateId = () => {
    const maxId = phonebook.length > 0
      ? Math.max(...phonebook.map(n => n.id))
      : 0
    return maxId + 1
  }

app.get('/info', (req, res) => {
    res.send('Phonebook has info for ' + phonebook.length + ' people' + '<br></br>' + new Date().toLocaleString())
})

app.get('/', function (req, res) {
    res.send('hello, world!')
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})