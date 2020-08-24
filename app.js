const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { requestLogger, unknownEndpoint, errorHandler } = require('./utils/middleware')
const notesRouter = require('./controllers/note')
const { url } = require('./utils/config')
const { info, errorlog } = require('./utils/logger')

const app = express()

mongoose.set('useFindAndModify', false)
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)

info('connecting to', url)

const mongoClient = async () => {
  try {
    const connected = await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    if (connected) {
      info('connected to MongoDB')
    }
  } catch (error) {
    errorlog('error connecting to MongoDB:', error.message)
  }
}

mongoClient()

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