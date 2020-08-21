// const functions = require('firebase-functions');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
const express = require('express');
const cors = require('cors');
const Note = require('./models/note');

const app = express();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.get('/', (req, res) => {
	res.send(`<h1>Hello World</h1>`);
});

app.get('/api/notes', async (req, res) => {
	const notes = await Note.find({});
	res.json(notes);
});

app.get('/api/notes/:id', async (request, response) => {
	const note = await Note.findById(request.params.id);
	response.json(note);
});

app.post('/api/notes', async (request, response) => {
	const body = request.body;
  
	if (body.content === undefined) {
	  return response.status(400).json({ error: 'content missing' });
	}
  
	const note = new Note({
	  content: body.content,
	  important: body.important || false,
	  date: new Date(),
	});
  
	const savedNote = await note.save();
	response.json(savedNote);
});

app.delete('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id);
	notes = notes.filter(note => note.id !== id);

	response.status(204).end();
});

// exports.app = functions.https.onRequest(app);

const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
	console.log(`App LIVE on port ${PORT}`);
});