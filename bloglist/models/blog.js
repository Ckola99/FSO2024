const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

// Set the toJSON method to transform Mongoose document objects:
// - Convert the _id object to a string and rename it to 'id' for consistency.
// - Remove unnecessary fields like _id and __v from the returned JSON.
// This helps simplify the data structure we send to clients and ensures the id is always a string.
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})



module.exports = mongoose.model('Blog', blogSchema)