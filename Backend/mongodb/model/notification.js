const mongoose = require('mongoose')

const schema = mongoose.Schema({

	recipent: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	type: {
		type: String,
		enum: ['newServiceRequest', 'orderUpdate']
	},
	status: {
		type: String,
		enum: ['unread', 'read']
	},
	timestamp: {
		type: Date,
		default: Date.now
	}

})

module.exports = mongoose.model('Notification', schema)