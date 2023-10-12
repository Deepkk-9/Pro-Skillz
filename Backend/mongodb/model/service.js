const mongoose = require('mongoose')

const schema = mongoose.Schema({

	provider: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ServiceProvider',
		required: true
	},
	name: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	serviceCharge: {
		type: Number,
		required: true
	}

})

module.exports = mongoose.model('Service', schema)