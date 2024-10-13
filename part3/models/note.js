const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI


console.log('connecting to', url)

mongoose.connect(url)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

// Set the toJSON method to transform Mongoose document objects:
// - Convert the _id object to a string and rename it to 'id' for consistency.
// - Remove unnecessary fields like _id and __v from the returned JSON.
// This helps simplify the data structure we send to clients and ensures the id is always a string.
noteSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})



module.exports = mongoose.model('Note', noteSchema)
