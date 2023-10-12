const mongoose = require('mongoose')

const schema = mongoose.Schema({

	firstname: {
		type: String,
	},
	lastname: {
		type: String,
	},
	email: {
		type: String
	},
	phone: {
		type: String,
		required: true
	},
	passwordHash: {
		type: String
	},
	role: {
		type: String,
		required: true, 
		enum: ['user', 'serviceProvider']
	},
	profilePicture: {
		data: Buffer,
		contentType: String
	},
	address: {
		type: String
	},
	otp: {
		type: String
	}

})

schema.set('toJSON', {

	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v	
	}

})

module.exports = mongoose.model('User', schema)