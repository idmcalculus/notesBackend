// const functions = require('firebase-functions');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
const express = require('express');
const cors = require('cors');
const Note = require('./models/note');
const errorHandler = require('./middlewares/handleError');

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

app.get('/api/notes/:id', async (request, response, next) => {
	try {
		const note = await Note.findById(request.params.id);
		if (note) {
			response.json(note);
		} else {
			response.status(404).end();
		}
	} catch (error) {
		next(error);
	}
});

app.post('/api/notes', async (request, response, next) => {
	const body = request.body;
  
	if (body.content === undefined) {
	  return response.status(400).json({ error: 'content missing' });
	}
  
	try {
		const note = new Note({
			content: body.content,
			important: body.important || false,
			date: new Date(),
		});
		
		const savedNote = await note.save();
		response.json(savedNote.toJSON());
	} catch (error) {
		next(error);
	}
});

app.put('/api/notes/:id', async (request, response, next) => {
	const body = await request.body;
  
	const note = {
	  content: body.content,
	  important: body.important,
	};
  
	try {
		const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true });
		response.json(updatedNote);
	} catch(error) {
		next(error);
	}
});

app.delete('/api/notes/:id', async (request, response, next) => {
	try {
		const deletedNote = await Note.findByIdAndRemove(request.params.id);
		if (deletedNote) {
			response.status(204).end();
		}
	} catch (error) {
		next(error);
	}
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
}

app.use(errorHandler);
app.use(unknownEndpoint);

// exports.app = functions.https.onRequest(app);

const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
	console.log(`App LIVE on port ${PORT}`);
});