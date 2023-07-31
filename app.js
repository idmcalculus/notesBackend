const express = require('express')
const cors = require('cors')
const app = express()
require('express-async-errors')
const { requestLogger, unknownEndpoint, errorHandler } = require('./utils/middleware')

const notesRouter = require('./controllers/note')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.use(errorHandler)
app.use(unknownEndpoint)

module.exports = app