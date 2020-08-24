const express = require('express')
const cors = require('cors')
const { requestLogger, unknownEndpoint, errorHandler } = require('./utils/middleware')
const notesRouter = require('./controllers/note')

const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)
app.use('/api/notes', notesRouter)

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.use(errorHandler)
app.use(unknownEndpoint)

module.exports = app