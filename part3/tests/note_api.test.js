const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const Note = require('../models/note')
const assert = require('node:assert')

const api = supertest(app)

beforeEach(async () => {
  await Note.deleteMany({})
  let noteObject = new Note(helper.initialNotes[0])
  await noteObject.save()
  noteObject = new Note(helper.initialNotes[1])
  await noteObject.save()
})

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const response = await api.get('/api/notes');
  assert.strictEqual(response.body.length, helper.initialNotes.length);
});

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes');
  const contents = response.body.map(e => e.content);
  assert(contents.includes('HTML is easy'));
});

// This test checks the functionality of adding a valid note to the API.
// It sends a POST request to the '/api/notes' endpoint with a new note object.
// The test verifies that:
// 1. The response status is 201 (Created), indicating the note was successfully added.
// 2. The content type of the response is JSON.
// 3. The total number of notes in the database has increased by one.
// 4. The newly added note is present in the list of notes returned from the API.

test('a valid note can be added ', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  }

  // Send a POST request to add the new note
  await api
    .post('/api/notes')                // Specify the endpoint for adding notes
    .send(newNote)                     // Attach the new note object in the request body
    .expect(201)                       // Assert that the response status is 201 (Created)
    .expect('Content-Type', /application\/json/) // Assert that the response is in JSON format

  const notesAtEnd = await helper.notesInDb()
  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

  const contents = notesAtEnd.map(n => n.content)
  assert(contents.includes('async/await simplifies making async calls'))
})

test('note without content is not added', async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  const notesAtEnd = await helper.notesInDb()
  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
})

test('a specific note can be viewed', async () => {
  const notesAtStart = await helper.notesInDb()

  const noteToView = notesAtStart[0]


  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(resultNote.body, noteToView)
})

test('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToDelete = notesAtStart[0]


  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

  const notesAtEnd = await helper.notesInDb()

  const contents = notesAtEnd.map(r => r.content)
  assert(!contents.includes(noteToDelete.content)) //returns false if not found then ! turns it false resulting in the assertion being correct

  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1) //creates a robust check
})

after(async () => {
  await mongoose.connection.close()
})
