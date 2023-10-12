const mongoose = require('mongoose')

const schema = mongoose.Schema({

	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	serviceProvider: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	status: {
		type: String,
		enum: ['pending', 'confirmed']
	},
	location: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Location',
		required: true
	},
	scheduledTime: {
		type: Date,
		required: true
	},
	timestamp: {
		type: Date,
		default: Date.now
	}

})

module.exports = mongoose.model('Request', schema)