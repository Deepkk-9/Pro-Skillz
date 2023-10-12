const mongoose = require('mongoose')

const schema = mongoose.Schema({

	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	description: {
		type: String,
	},
	categories: [
		{
			type: String,
		}
	],
	avgRating: {
		type: Number
	},
	verified: {
		type: Boolean
	},
	allowed: {
		type: Boolean,
	}

})

module.exports = mongoose.model('ServiceProvider', schema)