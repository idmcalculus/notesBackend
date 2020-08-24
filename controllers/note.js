const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
  res.json(notes)
})

notesRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id)
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

notesRouter.post('/', async (request, response, next) => {
  const { content, important } = await request.body

  if (content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  try {
    const note = new Note({
      content,
      important: important || false,
      date: new Date()
    })
    const savedNote = await note.save()
    response.json(savedNote.toJSON())
  } catch (error) {
    next(error)
  }
})

notesRouter.put('/:id', async (request, response, next) => {
  const { content, important } = await request.body

  const note = {
    content, important
  }

  try {
    const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true })
    response.json(updatedNote)
  } catch(error) {
    next(error)
  }
})

notesRouter.delete('/:id', async (request, response, next) => {
  try {
    const deletedNote = await Note.findByIdAndRemove(request.params.id)
    if (deletedNote) {
      response.status(204).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = notesRouter