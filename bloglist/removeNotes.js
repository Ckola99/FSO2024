const mongoose = require('mongoose')
const User = require('./models/user') // Adjust the path if necessary

const mongoUri = 'mongodb+srv://christopherkola:Jumpman99@clusterfso.atfg2.mongodb.net/blogApp'

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.error('MongoDB connection error:', err))

async function removeNotesField() {
	try {
		const result = await User.updateMany({}, { $unset: { notes: "" } })
		console.log('Successfully removed notes field:', result)
	} catch (error) {
		console.error('Error removing notes field:', error)
	} finally {
		mongoose.connection.close()
	}
}

removeNotesField()
