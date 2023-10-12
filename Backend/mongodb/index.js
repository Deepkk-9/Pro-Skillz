const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const { MONGODB_URI } = require('../config/config')

const connectToMongoDB = () => {

	mongoose.connect(MONGODB_URI)
		.then(() => {
			console.log('Connected to MongoDB')
		})
		.catch(error => {
			console.log('Error connecting to MongoDB: ', error.message)
		})

	mongoose.set('debug', true)

}

module.exports = connectToMongoDB