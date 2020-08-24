const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const url = process.env.CONNECTION_URL;

console.log('connecting to', url);

const mongoClient = async () => {
  try {
    const connected = await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    if (connected) {
      console.log('connected to MongoDB');
    }
  } catch (error) {
    console.log('error connecting to MongoDB:', error.message);
  }
};

mongoClient();

mongoose.set('useFindAndModify', false);

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true
  },
  date: { 
    type: Date,
    required: true
  },
  important: Boolean,
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Note', noteSchema);