const mongoose = require('mongoose')
require('dotenv').config()
const { info, error } = require('./utils/logger')

const url = process.env.CONNECTION_URL

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
})

/* note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close();
}); */

Note.find({})
  .then(result => {
    result.forEach(note => {
      info(note)
    })
    mongoose.connection.close()
  })
  .catch(err => {error(err)})