const express = require('express')
const app = express()
const cors = require('cors')
var morgan = require('morgan')

app.use(express.json());

// Use CORS middleware
app.use(cors());

morgan.token('body', function (req) {
	// Stringify the body; if it's missing, log that it's missing
	return JSON.stringify(req.body) || 'missing body';
});

app.use(morgan(function (tokens, req, res) {
	return [
		tokens.method(req, res),
		tokens.url(req, res),
		tokens.status(req, res),
		tokens.res(req, res, 'content-length'), '-',
		tokens['response-time'](req, res), 'ms',
		tokens.body(req, res)
	].join(' ')
}))

let persons = [
	{
		"id": "1",
		"name": "Arto Hellas",
		"number": "040-123456"
	},
	{
		"id": "2",
		"name": "Ada Lovelace",
		"number": "39-44-5323523"
	},
	{
		"id": "3",
		"name": "Dan Abramov",
		"number": "12-43-234345"
	},
	{
		"id": "4",
		"name": "Mary Poppendieck",
		"number": "39-23-6423122"
	}
]

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.get('/api/info', (request, response) => {
	const date = new Date();
	response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
  `);
})

app.get('/api/persons/:id', (request, response) => {
	const id = request.params.id;
	const person = persons.find(person => person.id === id);

	if (person) {
		response.json(person);
	} else {
		response.status(404).end();
	}
})

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id
	persons = persons.filter(person => person.id !== id)

	response.status(204).end()
})

const generateId = () => {
	const maxId = persons.length > 0
		? Math.max(...persons.map(person => Number(person.id)))
		: 0
	return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
	const body = request.body

	if (!body.name || !body.number) {
		return response.status(400).json({
			error: 'content missing'
		})
	};

	const existingName = persons.find(person => person.name === body.name);

	if (existingName) {
		return response.status(400).json({
			error: 'name must be unique'
		});
	};

	const person = {
		id: generateId(),
		name: body.name,
		number: body.number
	};

	persons = persons.concat(person);

	response.json(person);
})

const PORT = process.env.port || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})