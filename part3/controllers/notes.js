const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})

notesRouter.get('/:id', async (request, response ) => {
  // try {
  //   const note = await Note.findById(request.params.id)

  //   if (note) {
  //     response.json(note)
  //   } else {
  //     response.status(404).end()
  //   }
  // } catch (error) {
  //   next(error)
  // }

  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }

})

notesRouter.post('/', async (request, response) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  // try {
  //   const savedNote = await note.save()
  //   response.status(201).json(savedNote) // Respond with 201 and the created note
  // } catch (error) {
  //   next(error)
  // }

  const savedNote = await note.save()
  response.status(201).json(savedNote)

})

notesRouter.delete('/:id', async (request, response) => {
  // try {
  //   await Note.findByIdAndDelete(request.params.id)
  //   response.status(204).end()
  // } catch (error) {
  //   next(error)
  // }
  // installed async errors library therefore:

  await Note.findByIdAndDelete(request.params.id)
  response.status(204).end()

})

notesRouter.put('/:id', async (request, response ) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  // Note.findByIdAndUpdate(request.params.id, note, { new: true })
  //   .then(updatedNote => {
  //     response.json(updatedNote)
  //   })
  //   .catch(error => next(error))

  // try {
  //   const updatedNote = Note.findByIdAndUpdate(request.params.id, note, {new: true})

  //   if(updatedNote) {
  //     response.json(updatedNote)
  //   } else {
  //     response.status(404).json({ error: 'Note not found' })
  //   }
  // } catch(error) {
  //   next(error)
  // }

  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true })
  if(updatedNote){
    response.json(updatedNote)
  } else {
    response.status(404).json({ error: 'Note not found' })
  }

})



module.exports = notesRouter
