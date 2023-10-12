const mongoose = require('mongoose')

const schema = mongoose.Schema({

	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	services: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Service',
		}
	],
	totalPrice: {
		type: Number,
	},
	timestamp: {
		type: Date,
		default: Date.now
	}

})

module.exports = mongoose.model('Cart', schema)