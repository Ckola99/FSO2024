const mongoose = require('mongoose')
require('dotenv').config();

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'HTML is easy',
//   important: true,
// })

// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

const note1 = new Note({
  content: 'HTML is easy',
  important: true,
});

const note2 = new Note({
  content: 'JavaScript is versatile',
  important: true,
});

note1.save().then(() => {
  note2.save().then(() => {
    console.log('notes saved!');
    mongoose.connection.close();
  });
});
