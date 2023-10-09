const mongoose = require('mongoose')

const schema = mongoose.Schema({

	reviewer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	target: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	rating: {
		type: Number,
		required: true,
		min: 1,
		max: 5
	},
	comment: {
		type: String,
	},
	timestamp: {
		type: Date,
		default: Date.now
	}

})

module.exports = mongoose.model('Review', schema)